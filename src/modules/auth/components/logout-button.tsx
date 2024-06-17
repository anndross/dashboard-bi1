"use client";
import { Button } from "@tremor/react";
import { AuthActions } from "../actions/auth";

export function LogoutButton() {
  async function handleLogout() {
    AuthActions.logout();
  }

  return (
    <Button onClick={handleLogout} variant="secondary">
      Sair
    </Button>
  );
}
