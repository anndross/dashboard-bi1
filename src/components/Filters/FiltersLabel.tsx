import { ReactNode } from "react";

interface FiltersLabelProps {
  children: ReactNode;
}

export function FiltersLabel({ children }: FiltersLabelProps) {
  return (
    <p className="uppercase whitespace-nowrap text-sm text-zinc-700 font-semibold mr-1">
      {children}
    </p>
  );
}
