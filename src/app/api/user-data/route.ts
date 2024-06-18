import { AuthService } from "@/modules/auth/services/auth";
import { cookies } from "next/headers";
import { getUserPayload } from "../utils/getSessionPayload";

function getSession() {
  return cookies().get('session')
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