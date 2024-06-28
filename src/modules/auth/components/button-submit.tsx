"use client";
import { useFormStatus } from "react-dom";

interface ButtonSubmitProps {
  onClick?: () => void;
}

export function ButtonSubmit({ onClick }: ButtonSubmitProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="w-full h-10 text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      {pending ? "Entrando..." : "Entrar"}
    </button>
  );
}
