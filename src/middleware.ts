import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if user is trying to access dashboard without authentication
  if (pathname.startsWith('/dashboard')) {
    // For now, we'll let the client-side auth handle this
    // The ProtectedRoute component will redirect to /login if not authenticated
    return NextResponse.next();
  }
  
  // Check if user is trying to access login page while already authenticated
  if (pathname === '/login') {
    // For now, we'll let the client-side auth handle this
    // The AuthContext will redirect to /dashboard if already authenticated
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/admin/:path*',
  ],
}; 