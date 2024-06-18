import { AuthService } from "@/modules/auth/services/auth"
import { cookies } from "next/headers"

function getSession() {
  return cookies().get('session')
}

export async function getUserPayload() {
  const sessionCookie = getSession()
  if (sessionCookie) {
    const user = await AuthService.openSessionToken(sessionCookie.value)
    return user
  }
}