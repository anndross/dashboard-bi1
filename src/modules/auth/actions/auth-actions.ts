import { redirect } from "next/navigation";
import { AuthService } from "../services/auth-service";

async function login(formData: FormData) {
  'use server';

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const email = formData.get('email') as string
  const password = formData.get('password') as string

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

  if(data.error) {
    console.log(data.error)
    return 
  }

  if(res.ok) {
    await AuthService.createSessionToken({ name: data.first_name, email: data.email })

    redirect('/home')
  }   
}

export const AuthActions = {
  login
}