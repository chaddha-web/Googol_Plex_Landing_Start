import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  MAX_ATTEMPTS,
  OTP_COOKIE,
  OTP_TTL_SECONDS,
  USER_COOKIE,
  hashCode,
  signPayload,
  verifyPayload
} from "@/lib/otp";

export const runtime = "nodejs";

type Body = { code?: unknown };

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const code = typeof body.code === "string" ? body.code.trim() : "";
  if (!/^\d{6}$/.test(code)) {
    return NextResponse.json(
      { error: "Please enter the 6-digit code." },
      { status: 400 }
    );
  }

  const token = cookies().get(OTP_COOKIE)?.value;
  if (!token) {
    return NextResponse.json(
      { error: "No pending code — please request a new one." },
      { status: 400 }
    );
  }

  const payload = verifyPayload(token);
  if (!payload) {
    const res = NextResponse.json({ error: "Invalid session." }, { status: 400 });
    res.cookies.delete(OTP_COOKIE);
    return res;
  }
  if (Date.now() > payload.expiresAt) {
    const res = NextResponse.json(
      { error: "Code expired — please request a new one." },
      { status: 400 }
    );
    res.cookies.delete(OTP_COOKIE);
    return res;
  }

  if (hashCode(code) !== payload.codeHash) {
    const attempts = payload.attempts + 1;
    if (attempts >= MAX_ATTEMPTS) {
      const res = NextResponse.json(
        { error: "Too many attempts — please request a new code." },
        { status: 429 }
      );
      res.cookies.delete(OTP_COOKIE);
      return res;
    }
    const updated = signPayload({ ...payload, attempts });
    const res = NextResponse.json(
      {
        error: "Incorrect code.",
        attemptsLeft: MAX_ATTEMPTS - attempts
      },
      { status: 400 }
    );
    res.cookies.set(OTP_COOKIE, updated, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: OTP_TTL_SECONDS
    });
    return res;
  }

  // Success — burn the OTP cookie, set a lightweight user cookie so the rest
  // of the app can tell who's signed in. This is NOT a session/auth cookie;
  // it's just a UX marker. Replace with real session management when wiring
  // a backend.
  const res = NextResponse.json({
    ok: true,
    user: {
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      mode: payload.mode
    }
  });
  res.cookies.delete(OTP_COOKIE);
  res.cookies.set(USER_COOKIE, encodeURIComponent(payload.email), {
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  });
  return res;
}
