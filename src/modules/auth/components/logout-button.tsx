"use client";
import { Button } from "@tremor/react";
import { useRouter } from "next/router";
import { MouseEvent } from "react";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout(event: MouseEvent<HTMLElement>) {
    event.preventDefault();
    router.push("/login");

    const response = await fetch("https://dashboard-bi1.vercel.app/api/logout");
    const message = await response.json();

    console.log(message);
  }

  return (
    <Button onClick={handleLogout} variant="secondary">
      Sair
    </Button>
  );
}
