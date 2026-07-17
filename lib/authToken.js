import { createHmac, timingSafeEqual } from 'crypto';

export const SESSION_COOKIE = 'admin_session';
const MAX_AGE_MS = 1000 * 60 * 60 * 12; // 12 hours

function sign(payload) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('Missing SESSION_SECRET environment variable.');
  return createHmac('sha256', secret).update(payload).digest('hex');
}

// Token format: "<expiryTimestamp>.<hmacSignature>"
export function createSessionToken() {
  const expires = Date.now() + MAX_AGE_MS;
  const payload = String(expires);
  const sig = sign(payload);
  return `${payload}.${sig}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;

  const expected = sign(payload);
  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expected);
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!timingSafeEqual(sigBuf, expectedBuf)) return false;

  const expires = Number(payload);
  if (Number.isNaN(expires) || Date.now() > expires) return false;

  return true;
}
