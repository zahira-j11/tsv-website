import { createHash, createHmac, timingSafeEqual } from 'crypto';
import { NextRequest } from 'next/server';

/**
 * Admin session for the audit-applications view.
 *
 * The cookie holds an expiry and an HMAC, never the password. It is signed
 * with ADMIN_SESSION_SECRET only. Tokens signed with AUDIT_WEBHOOK_SECRET, or
 * with any other key, do not validate.
 */

export const ADMIN_COOKIE = 'tsv_admin';
export const ADMIN_SESSION_MS = 12 * 60 * 60 * 1000;

export function adminSessionSecret(): string | undefined {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return undefined;
  return secret;
}

/** True when the session secret is missing or still copies the webhook key. */
export function adminAuthMisconfigured(): boolean {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const password = process.env.ADMIN_PASSWORD;
  if (!secret || !password) return true;
  const webhook = process.env.AUDIT_WEBHOOK_SECRET;
  return Boolean(webhook) && secret === webhook;
}

export function signSession(exp: number, secret: string): string {
  const sig = createHmac('sha256', secret).update(String(exp)).digest('hex').slice(0, 32);
  return `${exp}.${sig}`;
}

export function sessionValid(token: string | undefined, secret: string): boolean {
  if (!token || !secret) return false;
  const dot = token.indexOf('.');
  if (dot <= 0) return false;
  const expRaw = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!/^\d+$/.test(expRaw)) return false;
  const exp = Number(expRaw);
  if (!Number.isSafeInteger(exp) || Date.now() > exp) return false;
  const expected = signSession(exp, secret).split('.')[1] ?? '';
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Length-independent equality. Hashes first so a short guess returns in the same time as a long one. */
export function safeEqual(given: string, actual: string): boolean {
  const a = createHash('sha256').update(given, 'utf8').digest();
  const b = createHash('sha256').update(actual, 'utf8').digest();
  return timingSafeEqual(a, b);
}

/** True when the request carries a valid admin session. */
export function isAdmin(req: NextRequest): boolean {
  const secret = adminSessionSecret();
  if (!secret || adminAuthMisconfigured()) return false;
  return sessionValid(req.cookies.get(ADMIN_COOKIE)?.value, secret);
}
