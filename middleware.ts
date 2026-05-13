import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to protect the member portal.
 * Checks for the presence of the ntcogk_token httpOnly cookie.
 */
export function middleware(request: NextRequest) {
  const token = request.cookies.get('ntcogk_token')?.value;
  const { pathname } = request.nextUrl;

  // 1. Protect all routes starting with /portals/member
  if (pathname.startsWith('/portals/member')) {
    if (!token) {
      // If no token exists, redirect to the auth page
      return NextResponse.redirect(new URL('/auth', request.url));
    }
  }

  // 2. Prevent logged-in users from accessing the auth page
  if (pathname === '/auth') {
    if (token) {
      // If token exists, redirect to the member portal
      return NextResponse.redirect(new URL('/portals/member', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/portals/member/:path*',
    '/auth'
  ],
};
