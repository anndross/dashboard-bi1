import { BadgeDelta, BadgeDeltaProps } from "@tremor/react";
import { ReactNode } from "react";
import { Tailwindest } from "tailwindest";

interface BadgeProps extends BadgeDeltaProps {
  children: ReactNode;
}

export function Badge({ children, ...props }: BadgeProps) {
  return <BadgeDelta {...props}>{children}</BadgeDelta>;
}
