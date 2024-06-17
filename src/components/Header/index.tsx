import Image from "next/image";
import Link from "next/link";
import { User } from "./User";

interface HeaderProps {
  notLogged?: boolean;
}

export function Header({ notLogged = false }: HeaderProps) {
  return (
    <header className="z-20 w-full h-20 fixed top-0 bg-zinc-700 flex items-center justify-between px-10">
      <Link href="/">
        <Image
          unoptimized
          src="/assets/logo.svg"
          width={64}
          height={38}
          title="Coquetel express"
          alt="Coquetel express"
        />
      </Link>

      {!notLogged && (
        <>
          <nav className="flex gap-2">
            <Link className="uppercase text-white text-sm font-medium" href="/">
              estoque
            </Link>
            <Link className="uppercase text-white text-sm font-medium" href="/">
              agenda
            </Link>
            <Link className="uppercase text-white text-sm font-medium" href="/">
              relatórios
            </Link>
          </nav>
          <User />
        </>
      )}
    </header>
  );
}
