import Link from "next/link";

import { WalletButton } from "@/components/WalletButton";

const links = [
  { href: "/", label: "Home" },
  { href: "/listing", label: "Listing" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/25 bg-[#f7f5e8]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-2xl tracking-[0.22em] text-paddy">
          NusaCow
        </Link>
        <nav className="hidden gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-[0.24em] text-paddy/75 transition hover:text-paddy"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <WalletButton />
      </div>
    </header>
  );
}
