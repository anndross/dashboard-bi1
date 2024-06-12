import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  notLogged?: boolean;
}

export function Header({ notLogged = false }: HeaderProps) {
  return (
    <header className="z-20 w-full h-20 fixed top-0 bg-zinc-700 flex items-center justify-between px-10">
      <Link href="/">
        <Image
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

          <div className="h-14 w-14 rounded-full bg-slate-300 text-center p-1 flex items-center justify-center">
            <p className="text-[10px] font-bold text-blue-900 uppercase text-center">
              Campari group
            </p>
          </div>
        </>
      )}
    </header>
  );
}
