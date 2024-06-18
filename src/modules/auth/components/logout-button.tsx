"use client";
import { Button } from "@tremor/react";
import { MouseEvent } from "react";

export function LogoutButton() {
  async function handleLogout(event: MouseEvent<HTMLElement>) {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/api/logout");
    const message = await response.json();

    console.log(message);
  }

  return (
    <Button onClick={handleLogout} variant="secondary">
      Sair
    </Button>
  );
}
