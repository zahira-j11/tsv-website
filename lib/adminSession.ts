import { NextRequest } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';

/**
 * The admin session shared by every admin-only API route.
 *
 * Signing in (POST /api/audit/applications) sets a cookie holding an expiry
 * signed with AUDIT_WEBHOOK_SECRET, never the password itself. Anything that
 * changes what the public site shows must check it.
 */

export const ADMIN_COOKIE = 'tsv_admin';
export const ADMIN_SESSION_MS = 12 * 60 * 60 * 1000;

export function signSession(exp: number, secret: string): string {
  return `${exp}.${createHmac('sha256', secret).update(String(exp)).digest('hex').slice(0, 32)}`;
}

export function sessionValid(token: string | undefined, secret: string): boolean {
  if (!token) return false;
  const [expRaw, sig] = token.split('.');
  const exp = Number(expRaw);
  if (!exp || !sig || Date.now() > exp) return false;
  const expected = signSession(exp, secret).split('.')[1];
  const a = Buffer.from(sig), b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function safeEqual(given: string, actual: string): boolean {
  const a = Buffer.from(given), b = Buffer.from(actual);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** True when the request carries a valid admin session. */
export function isAdmin(req: NextRequest): boolean {
  const secret = process.env.AUDIT_WEBHOOK_SECRET;
  if (!secret) return false;
  return sessionValid(req.cookies.get(ADMIN_COOKIE)?.value, secret);
}
