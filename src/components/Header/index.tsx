import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="h-20 bg-zinc-700 flex items-center justify-between px-10">
      <Image
        src="/assets/logo.png"
        width={64}
        height={38}
        title="Coquetel express"
        alt="Coquetel express"
      />
      <nav className="flex gap-2">
        <Link className="uppercase text-white text-sm font-medium" href="/">
          home
        </Link>
        <Link className="uppercase text-white text-sm font-medium" href="/">
          agenda
        </Link>
        <Link className="uppercase text-white text-sm font-medium" href="/">
          relatórios
        </Link>
        <Link className="uppercase text-white text-sm font-medium" href="/">
          estoque
        </Link>
      </nav>

      <div className="h-14 w-14 rounded-full bg-slate-400 text-center p-1 flex items-center justify-center">
        <p className="text-[10px] font-bold text-blue-950 uppercase text-center">
          Campari group
        </p>
      </div>
    </header>
  );
}
