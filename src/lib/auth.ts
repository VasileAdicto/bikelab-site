import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const SECRET = new TextEncoder().encode(
  process.env.ADMIN_SECRET || "bikelab-admin-secret-change-in-production"
);
const COOKIE_NAME = "bikelab_admin";

export type Session = { username: string; exp: number };

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(username: string): Promise<string> {
  return new SignJWT({ username })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .setIssuedAt()
    .sign(SECRET);
}

export async function getSession(token: string | undefined): Promise<Session | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return { username: payload.username as string, exp: payload.exp as number };
  } catch {
    return null;
  }
}

export function getSessionFromCookie(cookieHeader: string | null): Promise<Session | null> {
  if (!cookieHeader) return Promise.resolve(null);
  const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  const token = match ? decodeURIComponent(match[1]) : undefined;
  return getSession(token);
}

export { COOKIE_NAME };
