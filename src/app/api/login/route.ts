import { AuthService } from "@/modules/auth/services/auth";

export async function POST(request: Request) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const body = await request.json()

  const { email, password } = body

  const headers = new Headers()
  headers.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    email,
    password
  })

  const requestOptions: RequestInit = {
    method: "POST",
    headers: headers,
    body: raw,
    redirect: "follow",
    cache: "no-store",
  }

  const res = await fetch('https://prd-api01.bi1analytics.com.br:5000/api/beta/login', requestOptions)
  const data = await res.json()

  if (data.error) {
    return Response.json({ error: data.error })
  }

  if (res.ok) {
    await AuthService.createSessionToken({
      name: data.user.first_name,
      lastName: data.user.last_name,
      company: data.user.company,
      user: data.user.User,
      email: data.user.email
    })

    return Response.json({ message: 'login success' })
    // return redirect('/estoque')
  }

  return Response.json({ error: 'something went wrong' })
}