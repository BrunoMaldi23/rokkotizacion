import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = request.nextUrl.pathname === '/admin/login';
  
  // Verificar si hay sesión (desde localStorage no se puede en middleware)
  // Por simplicidad, usamos una cookie
  const adminSession = request.cookies.get('adminSession')?.value;
  
  if (isAdminRoute && !isLoginPage && !adminSession) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  
  if (isLoginPage && adminSession) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};