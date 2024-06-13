import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from './modules/auth/services/auth-service';

export const config = { matcher: '/((?!_next/static|_next/image|favicon.ico|public/assets/.*).*)', };

const publicRoutes = [
  '/login'
];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const session = await AuthService.isSessionValid();

  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export default middleware;
