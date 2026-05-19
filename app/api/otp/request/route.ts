import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  OTP_COOKIE,
  OTP_TTL_SECONDS,
  generateCode,
  hashCode,
  isValidEmail,
  isValidIdempotencyKey,
  signPayload,
  verifyPayload,
  type OtpMode,
  type OtpPayload
} from "@/lib/otp";
import { sendOtpEmail } from "@/lib/resend";

// Force Node runtime — Resend uses Node APIs and our HMAC uses node:crypto.
export const runtime = "nodejs";

type Body = {
  email?: unknown;
  mode?: unknown;
  firstName?: unknown;
  lastName?: unknown;
};

const cookieOpts = {
  httpOnly: true as const,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: OTP_TTL_SECONDS
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { email, mode, firstName, lastName } = body;

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (mode !== "signup" && mode !== "login") {
    return NextResponse.json({ error: "Invalid mode." }, { status: 400 });
  }
  if (mode === "signup") {
    if (typeof firstName !== "string" || !firstName.trim()) {
      return NextResponse.json(
        { error: "First name is required." },
        { status: 400 }
      );
    }
    if (typeof lastName !== "string" || !lastName.trim()) {
      return NextResponse.json(
        { error: "Last name is required." },
        { status: 400 }
      );
    }
  }

  const normalisedEmail = email.trim().toLowerCase();
  const rawKey = req.headers.get("idempotency-key") || req.headers.get("x-idempotency-key");
  const idempotencyKey = isValidIdempotencyKey(rawKey) ? rawKey : undefined;

  // Idempotency check — if the existing OTP cookie was created with the same
  // idempotency key (and is still valid / matches mode + email), short-circuit:
  // return success WITHOUT sending another email. This makes retried POSTs and
  // double-clicks safe.
  if (idempotencyKey) {
    const existing = cookies().get(OTP_COOKIE)?.value;
    if (existing) {
      const prev = verifyPayload(existing);
      if (
        prev &&
        prev.idempotencyKey === idempotencyKey &&
        prev.email === normalisedEmail &&
        prev.mode === mode &&
        Date.now() < prev.expiresAt
      ) {
        return NextResponse.json({ ok: true, replayed: true });
      }
    }
  }

  const code = generateCode();
  const payload: OtpPayload = {
    email: normalisedEmail,
    codeHash: hashCode(code),
    mode: mode as OtpMode,
    expiresAt: Date.now() + OTP_TTL_SECONDS * 1000,
    attempts: 0,
    ...(mode === "signup"
      ? {
          firstName: (firstName as string).trim(),
          lastName: (lastName as string).trim()
        }
      : {}),
    ...(idempotencyKey ? { idempotencyKey } : {})
  };

  try {
    await sendOtpEmail({
      to: payload.email,
      code,
      firstName: payload.firstName
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[otp/request] resend send failed", err);
    return NextResponse.json(
      { error: "We couldn't send the code right now. Please try again." },
      { status: 502 }
    );
  }

  const token = signPayload(payload);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(OTP_COOKIE, token, cookieOpts);
  return res;
}
