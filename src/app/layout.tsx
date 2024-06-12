import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from 'clsx'
const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body
        className={clsx(
          "h-screen min-h-screen flex flex-col",
          inter.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
