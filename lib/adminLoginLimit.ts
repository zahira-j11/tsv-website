/**
 * Failed sign-in counter for the audit-applications admin.
 *
 * Five wrong passwords for one IP inside 15 minutes lock that IP out. The
 * sixth attempt in the window is rejected. Counts live in this process only:
 * a cold start or another server instance has its own counter. There is no
 * shared store (the hosting budget does not allow one).
 */

export const LOGIN_WINDOW_MS = 15 * 60 * 1000;
export const LOGIN_MAX_FAILURES = 5;

type Store = Map<string, number[]>;

const globalStore = globalThis as unknown as { __tsvAdminLoginFailures?: Store };
const buckets: Store = globalStore.__tsvAdminLoginFailures ?? new Map();
globalStore.__tsvAdminLoginFailures = buckets;

function prune(ip: string, now: number): number[] {
  const kept = (buckets.get(ip) ?? []).filter((at) => now - at < LOGIN_WINDOW_MS);
  if (kept.length === 0) buckets.delete(ip);
  else buckets.set(ip, kept);
  return kept;
}

function sweep(now: number) {
  if (buckets.size < 2000) return;
  for (const ip of buckets.keys()) prune(ip, now);
}

/** Client address from the platform headers. Falls back to one shared bucket. */
export function clientIp(headers: { get(name: string): string | null }): string {
  const real = headers.get('x-real-ip')?.split(',')[0]?.trim();
  if (real) return real.slice(0, 80);
  const forwarded = headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  if (forwarded) return forwarded.slice(0, 80);
  return 'unknown';
}

export function loginLocked(ip: string, now = Date.now()): boolean {
  return prune(ip, now).length >= LOGIN_MAX_FAILURES;
}

export function recordLoginFailure(ip: string, now = Date.now()): { failures: number } {
  const kept = prune(ip, now);
  kept.push(now);
  buckets.set(ip, kept);
  sweep(now);
  return { failures: kept.length };
}

export function clearLoginFailures(ip: string) {
  buckets.delete(ip);
}

/** Seconds until the oldest failure in a full window ages out. */
export function lockoutRetryAfterSeconds(ip: string, now = Date.now()): number {
  const kept = prune(ip, now);
  if (kept.length < LOGIN_MAX_FAILURES) return 0;
  const oldest = Math.min(...kept);
  return Math.max(1, Math.ceil((oldest + LOGIN_WINDOW_MS - now) / 1000));
}

export function resetLoginLimits() {
  buckets.clear();
}
