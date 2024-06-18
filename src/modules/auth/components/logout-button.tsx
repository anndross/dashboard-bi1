"use client";
import { Button } from "@tremor/react";
import { logoutAction } from "../actions/logout";

export function LogoutButton() {
  return (
    <Button variant="secondary" onClick={() => logoutAction()}>
      Sair
    </Button>
  );
}
