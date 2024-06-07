import { ReactNode } from "react";

interface FiltersRootProps {
  children: ReactNode;
}

export function FiltersRoot({ children }: FiltersRootProps) {
  return <div className="flex gap-4 items-center">{children}</div>;
}
