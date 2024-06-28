import { ReactNode } from "react";

interface FiltersRootProps {
  children: ReactNode;
}

export function FiltersRoot({ children }: FiltersRootProps) {
  return (
    <div className="max-md:top-[100vh] shadow-sm z-20 w-fulls min-h-12 fixed top-20 bg-white px-10 py-2 flex items-center justify-start gap-4 w-full flex-wrap">
      {children}
    </div>
  );
}
