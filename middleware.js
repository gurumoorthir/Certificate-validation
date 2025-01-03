import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  const url = request.nextUrl;

  // Exclude 404 route and _next assets (Next.js internal files)
  if (url.pathname === '/404' || url.pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  // Apply your logic for protected routes
  if (!token && url.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/404'], // Apply middleware only to protected routes, and explicitly include 404
};
