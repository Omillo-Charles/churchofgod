import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

//Middleware to protect the member portal.
//Checks for the presence of the ntcogk_token httpOnly cookie.

export function middleware(request: NextRequest) {
  const token = request.cookies.get('ntcogk_token')?.value;
  const { pathname } = request.nextUrl;

  // 1. Protect all routes starting with /portals
  if (pathname.startsWith('/portals/')) {
    if (!token) {
      // If no token exists, redirect to the auth page
      return NextResponse.redirect(new URL('/auth', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/portals/:path*',
    '/auth'
  ],
};
