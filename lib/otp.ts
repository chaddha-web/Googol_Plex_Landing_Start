import crypto from "node:crypto";

/**
 * Server-side OTP helpers. The pending OTP is stored in an httpOnly,
 * HMAC-signed cookie so we never need a database for the demo flow.
 */

const SECRET = process.env.OTP_SECRET || "dev-only-secret-change-in-production";

if (SECRET === "dev-only-secret-change-in-production" && process.env.NODE_ENV === "production") {
  // eslint-disable-next-line no-console
  console.warn(
    "[otp] OTP_SECRET is unset in production — sign tokens with a real secret."
  );
}

export type OtpMode = "signup" | "login";

export type OtpPayload = {
  email: string;
  /** HMAC-SHA256 of the 6-digit code. We never store the code itself. */
  codeHash: string;
  mode: OtpMode;
  firstName?: string;
  lastName?: string;
  /** ms epoch */
  expiresAt: number;
  attempts: number;
};

export const OTP_COOKIE = "gplex_otp";
export const USER_COOKIE = "gplex_user";
export const OTP_TTL_SECONDS = 10 * 60;
export const MAX_ATTEMPTS = 5;

/** Crypto-strong 6-digit numeric code, zero-padded. */
export function generateCode(): string {
  const n = crypto.randomInt(0, 1_000_000);
  return n.toString().padStart(6, "0");
}

export function hashCode(code: string): string {
  return crypto.createHmac("sha256", SECRET).update(code).digest("hex");
}

export function signPayload(p: OtpPayload): string {
  const body = Buffer.from(JSON.stringify(p)).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifyPayload(token: string): OtpPayload | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, sig] = parts as [string, string];
  const expected = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as OtpPayload;
  } catch {
    return null;
  }
}

export function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
