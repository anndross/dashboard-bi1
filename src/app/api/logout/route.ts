import { AuthActions } from "@/modules/auth/actions/auth";
import { redirect } from "next/navigation";

export async function GET() {
  try {
    await AuthActions.logout()
    
    return Response.json({message: 'succesfull'})
  } catch (error) {
    return Response.json({error})
  }
}