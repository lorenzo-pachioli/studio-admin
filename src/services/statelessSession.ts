'use server';
import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { cookies } from 'next/headers';
import { User } from "firebase/auth";
import { redirect } from "next/navigation";
import { SessionPayload, IverifySessionPayload } from '@/types/session';

const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1hr')
    .sign(key);
}

export async function decrypt(session: string | undefined = ''): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    });
    return payload as SessionPayload;
  } catch (error) {
    return null;
  }
}

export async function createSession(uid: string) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({ uid, expiresAt });

  (await cookies()).set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function verifySession(): Promise<IverifySessionPayload> {
  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie);

  if (!session || !session.uid) return { isAuth: false };

  return { isAuth: true, cookie: cookie };
}

export async function updateSession() {
  const session = (await cookies()).get('session')?.value;
  const payload = await decrypt(session);

  if (!session || !payload) return null;

  const expires = new Date(Date.now() + 60 * 60 * 1000);
  (await cookies()).set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
}

export async function deleteSession() {
  (await cookies()).delete('session');
}