"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthButton from "./auth/AuthButton";

const links = [
  { href: "/", label: "Home" },
  { href: "/commands", label: "Commands" },
  { href: "/premium", label: "Premium" },
  { href: "/status", label: "Status" },
  { href: "/invite", label: "Invite" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#111]/80 backdrop-blur supports-[backdrop-filter]:bg-[#111]/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-block h-8 w-8 rounded-md bg-gradient-to-br from-primary to-primary-light shadow-glow" />
          <span>Swelly</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative hover:text-white ${
                pathname === l.href ? "text-white" : "text-white/70"
              } after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
