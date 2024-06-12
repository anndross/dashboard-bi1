import * as jose from 'jose'
import { cookies } from 'next/headers'

const secret = new TextEncoder().encode(process.env.AUTH_SECRET || '1o3nrfoadnfanofaopwens')

async function openSessionToken(token: string) {
  const { payload } = await jose.jwtVerify(token, secret)

  return payload
}

async function createSessionToken(payload = {}) {
  const session = await new jose.SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256'
    })
    .setExpirationTime('1d')
    .sign(secret)
  
  const {exp} = await openSessionToken(session)

  cookies().set('session', session, {
    expires: exp as number * 1000,
    path: '/',
    httpOnly: true
  })
}


async function isSessionValid() {
  const sessionCookie = cookies().get('session')

  if(sessionCookie) {
    const { value } = sessionCookie
    const { exp } = await openSessionToken(value)
    const currentDate = new Date().getTime()

    return ((exp as number) * 1000) > currentDate
  }

  return false
}

export const AuthService = {
  openSessionToken,
  createSessionToken,
  isSessionValid
}