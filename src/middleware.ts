import { verify } from 'crypto';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from './services/statelessSession';

export async function middleware(request: NextRequest) {
  const session = await verifySession();
  //console.log("Session in middleware:", session);

  // Rutas protegidas definidas en el config
  const protectedPaths = ['/dashboard'];

  // Verificar si el pathname actual coincide con alguna ruta protegida
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  // Solo permitir acceso si existe token Y tiene un valor
  if (isProtectedPath && !session.isAuth) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard']
};