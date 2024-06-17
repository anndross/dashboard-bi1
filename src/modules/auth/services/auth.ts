import * as jose from 'jose'
import { cookies } from 'next/headers'


async function openSessionToken(token: string) {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET)

  const { payload } = await jose.jwtVerify(token, secret)

  return payload
}

async function createSessionToken(payload = {}) {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET)

  const session = await new jose.SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256'
    })
    .setExpirationTime('1d')
    .sign(secret)
  
  const { exp } = await openSessionToken(session)

  // Verifique o tipo de exp para evitar erros
  const expirationDate = exp ? new Date(exp * 1000) : undefined

  cookies().set('session', session, {
    expires: expirationDate,
    path: '/',
  })
}


async function isSessionValid() {
  const sessionCookie = cookies().get('session')

  if (sessionCookie) {
    const { value } = sessionCookie
    const { exp } = await openSessionToken(value)
    const currentDate = new Date().getTime()

    return (exp as number) * 1000 > currentDate
  }

  return false
}

export const AuthService = {
  openSessionToken,
  createSessionToken,
  isSessionValid
}