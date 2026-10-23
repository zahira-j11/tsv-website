import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';
import { NextRequest } from 'next/server';
import {
  ADMIN_COOKIE,
  adminAuthMisconfigured,
  safeEqual,
  sessionValid,
  signSession,
} from '../lib/adminSession';
import {
  LOGIN_MAX_FAILURES,
  LOGIN_WINDOW_MS,
  clearLoginFailures,
  lockoutRetryAfterSeconds,
  loginLocked,
  recordLoginFailure,
  resetLoginLimits,
} from '../lib/adminLoginLimit';
import { GET, POST } from '../app/api/audit/applications/route';

const PASSWORD = 'correct-horse-battery';
const SESSION_SECRET = 'session-secret-for-tests-only';
const WEBHOOK_SECRET = 'old-webhook-secret-for-tests';

function configureEnv() {
  process.env.ADMIN_PASSWORD = PASSWORD;
  process.env.ADMIN_SESSION_SECRET = SESSION_SECRET;
  process.env.AUDIT_WEBHOOK_SECRET = WEBHOOK_SECRET;
  process.env.MONGODB_URI = 'mongodb://127.0.0.1:9/not-used';
}

function post(password: string, ip: string) {
  return new NextRequest('http://localhost/api/audit/applications', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': ip,
    },
    body: JSON.stringify({ password }),
  });
}

describe('admin session', () => {
  it('accepts a token signed with the session secret', () => {
    const exp = Date.now() + 60_000;
    const token = signSession(exp, SESSION_SECRET);
    assert.equal(sessionValid(token, SESSION_SECRET), true);
  });

  it('rejects a token signed with the old webhook secret', () => {
    const exp = Date.now() + 60_000;
    const token = signSession(exp, WEBHOOK_SECRET);
    assert.equal(sessionValid(token, SESSION_SECRET), false);
  });

  it('rejects an expired token and a tampered signature', () => {
    const expired = signSession(Date.now() - 1_000, SESSION_SECRET);
    assert.equal(sessionValid(expired, SESSION_SECRET), false);

    const live = signSession(Date.now() + 60_000, SESSION_SECRET);
    const flipped = `${live.slice(0, -1)}${live.endsWith('a') ? 'b' : 'a'}`;
    assert.equal(sessionValid(flipped, SESSION_SECRET), false);
    assert.equal(sessionValid(undefined, SESSION_SECRET), false);
    assert.equal(sessionValid('not-a-token', SESSION_SECRET), false);
  });

  it('compares strings without caring about length', () => {
    assert.equal(safeEqual(PASSWORD, PASSWORD), true);
    assert.equal(safeEqual('a', PASSWORD), false);
    assert.equal(safeEqual(PASSWORD, `${PASSWORD}x`), false);
    assert.equal(safeEqual('', PASSWORD), false);
  });

  it('treats a reused webhook secret as misconfigured', () => {
    process.env.ADMIN_PASSWORD = PASSWORD;
    process.env.ADMIN_SESSION_SECRET = WEBHOOK_SECRET;
    process.env.AUDIT_WEBHOOK_SECRET = WEBHOOK_SECRET;
    assert.equal(adminAuthMisconfigured(), true);
    process.env.ADMIN_SESSION_SECRET = SESSION_SECRET;
    assert.equal(adminAuthMisconfigured(), false);
  });
});

describe('admin login lockout', () => {
  afterEach(() => {
    resetLoginLimits();
  });

  it('locks after five failures and unlocks when the window passes', () => {
    const ip = '203.0.113.10';
    const start = 1_700_000_000_000;
    for (let i = 0; i < LOGIN_MAX_FAILURES; i++) {
      assert.equal(loginLocked(ip, start), false);
      recordLoginFailure(ip, start + i);
    }
    assert.equal(loginLocked(ip, start + LOGIN_MAX_FAILURES), true);
    assert.ok(lockoutRetryAfterSeconds(ip, start + LOGIN_MAX_FAILURES) > 0);
    assert.equal(loginLocked(ip, start + LOGIN_WINDOW_MS + 1), false);
  });

  it('keeps addresses separate and clears on success', () => {
    const start = 1_700_000_000_000;
    for (let i = 0; i < LOGIN_MAX_FAILURES; i++) recordLoginFailure('203.0.113.11', start);
    assert.equal(loginLocked('203.0.113.12', start), false);
    clearLoginFailures('203.0.113.11');
    assert.equal(loginLocked('203.0.113.11', start), false);
  });
});

describe('POST /api/audit/applications', () => {
  afterEach(() => {
    resetLoginLimits();
    configureEnv();
  });

  it('returns 401 five times and 429 on the sixth wrong password', async () => {
    configureEnv();
    const ip = '203.0.113.20';
    for (let i = 1; i <= LOGIN_MAX_FAILURES; i++) {
      const res = await POST(post('nope', ip));
      assert.equal(res.status, 401, `attempt ${i}`);
    }
    const locked = await POST(post('nope', ip));
    assert.equal(locked.status, 429);
    assert.ok(Number(locked.headers.get('retry-after')) > 0);
    const still = await POST(post(PASSWORD, ip));
    assert.equal(still.status, 429);
  });

  it('rejects a session signed with the old webhook secret', async () => {
    configureEnv();
    const token = signSession(Date.now() + 60_000, WEBHOOK_SECRET);
    const req = new NextRequest('http://localhost/api/audit/applications', {
      headers: { cookie: `${ADMIN_COOKIE}=${token}` },
    });
    const res = await GET(req);
    assert.equal(res.status, 401);
  });

  it('refuses to run when the session secret copies the webhook secret', async () => {
    configureEnv();
    process.env.ADMIN_SESSION_SECRET = WEBHOOK_SECRET;
    const res = await POST(post(PASSWORD, '203.0.113.21'));
    assert.equal(res.status, 503);
  });
});
