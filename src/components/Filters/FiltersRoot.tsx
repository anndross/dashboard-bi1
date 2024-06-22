import { ReactNode } from "react";

interface FiltersRootProps {
  children: ReactNode;
}

export function FiltersRoot({ children }: FiltersRootProps) {
  return (
    <div className="max-md:top-[100vh] shadow-sm z-20 w-fulls h-12 fixed top-20 bg-white px-10 flex items-center justify-end gap-4">
      {children}
    </div>
  );
}
