import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  // Configura o cabeçalho CSP para permitir todas as fontes
  const headers = {
    'Content-Security-Policy': "default-src 'self' *"
  };

  return NextResponse.next();
}

export default middleware;