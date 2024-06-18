import { AuthService } from "@/modules/auth/services/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
 const sessionCookie = cookies().get('session')

  let data = null 

  if (sessionCookie?.value.length) {
    try {
      const payload  = await AuthService.openSessionToken(sessionCookie.value);

      data = payload;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  return Response.json({ data })
}