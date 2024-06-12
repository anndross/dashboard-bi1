import type { Metadata } from "next";
import "../globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header notLogged />
      {children}
    </>
  );
}
