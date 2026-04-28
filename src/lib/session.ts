import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export interface SessionPayload extends JWTPayload {
  username: string;
  name: string;
  role: string;
}

export const SESSION_COOKIE = "ds_session";
const SESSION_DURATION = "8h";

function getEncodedKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET ?? "dev-secret-not-for-production";
  return new TextEncoder().encode(secret);
}

export async function encrypt(payload: Omit<SessionPayload, keyof JWTPayload>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getEncodedKey());
}

export async function decrypt(session: string | undefined): Promise<SessionPayload | null> {
  if (!session) return null;
  try {
    const { payload } = await jwtVerify(session, getEncodedKey(), { algorithms: ["HS256"] });
    return payload as SessionPayload;
  } catch {
    return null;
  }
}
