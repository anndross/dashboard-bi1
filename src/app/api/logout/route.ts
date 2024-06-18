import { cookies } from "next/headers";
export async function GET() {
  try {
    cookies().delete('session')
    return Response.json({ message: 'logout success' });
  } catch (error) {
    return Response.json({ error })
  }
}