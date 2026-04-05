/**
 * Remember this file will be in the root folder. e.g. for a project with 
 * src/ directory, it wiil be in the src/ directory
 */

// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get("x-auth-token")?.value;

  console.log("Token in middleware:", token);

  const { pathname } = request.nextUrl;

  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isAuthPage = pathname === '/login' || pathname === '/register';

  // No token → block dashboard
  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Token exists → block login/register
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register'
  ],
}