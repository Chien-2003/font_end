import { NextRequest, NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'my-secret-key';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const url = request.nextUrl;
  if (
    token &&
    (url.pathname === '/auth/login' ||
      url.pathname === '/auth/register')
  ) {
    try {
      jwt.verify(token, JWT_SECRET);
      return NextResponse.redirect(new URL('/', request.url));
    } catch {}
  }
  if (
    !token &&
    (url.pathname.startsWith('/dashboard') ||
      url.pathname.startsWith('/profile'))
  ) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/auth/login',
    '/auth/register',
  ],
};
