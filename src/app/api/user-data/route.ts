import { AuthService } from "@/modules/auth/services/auth";
import { cookies } from "next/headers";

export function getSession() {
  return cookies().get('session')
}

export function hasSession() {
  return !!(cookies().get('session'))
}

export async function getUserPayload() {
  const sessionCookie = getSession()
  if (sessionCookie) {
    const user = await AuthService.openSessionToken(sessionCookie.value)
    return user
  }
}

export async function GET() {
  const sessionCookie = getSession()
  if (sessionCookie?.value.length) {
    try {
      const user = await getUserPayload()
      return Response.json({ data: user })
    } catch (error) {
      return Response.json({ error })
    }
  } else {
    return Response.json({ message: 'sessionCookie was not provided' })
  }
}