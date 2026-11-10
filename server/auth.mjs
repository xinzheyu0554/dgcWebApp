import { randomBytes, scrypt as nativeScrypt, timingSafeEqual, createHash } from 'node:crypto';
import { promisify } from 'node:util';
const scrypt = promisify(nativeScrypt);

export const cookieName = 'dgc_session';
export const maxAge = 60 * 60 * 24 * 7;

export async function hashPassword(password) {
  if (typeof password !== 'string' || password.length < 12 || password.length > 128) {
    throw new Error('Password must contain 12–128 characters.');
  }
  const salt = randomBytes(16).toString('hex');
  const derived = await scrypt(password, Buffer.from(salt, 'hex'), 64);
  return `scrypt:${salt}:${derived.toString('hex')}`;
}

export async function verifyPassword(password, encoded) {
  try {
    const [method, salt, hash] = String(encoded).split(':');
    if (method !== 'scrypt' || !/^[a-f0-9]{32}$/.test(salt) || !/^[a-f0-9]{128}$/.test(hash)) return false;
    const derived = await scrypt(String(password), Buffer.from(salt, 'hex'), 64);
    return timingSafeEqual(derived, Buffer.from(hash, 'hex'));
  } catch {
    return false;
  }
}

export function makeToken() {
  return randomBytes(32).toString('base64url');
}
export function hashToken(token) {
  return createHash('sha256').update(token).digest('hex');
}
export function sessionCookie(token, req) {
  const secure = new URL(req.url).protocol === 'https:';
  return `${cookieName}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure ? '; Secure' : ''}`;
}
export function clearSessionCookie(req) {
  const secure = new URL(req.url).protocol === 'https:';
  return `${cookieName}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure ? '; Secure' : ''}`;
}
export function getSessionToken(req) {
  const cookies = req.headers.get('cookie') || '';
  const part = cookies.split(';').map((s) => s.trim()).find((s) => s.startsWith(cookieName + '='));
  if (!part) return null;
  try {
    const token = decodeURIComponent(part.substring(cookieName.length + 1));
    return /^[A-Za-z0-9_-]{40,64}$/.test(token) ? token : null;
  } catch {
    return null;
  }
}
export function publicUser(user) {
  return user && {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    role: user.role,
    active: user.active,
    created_at: user.created_at,
  };
}
