import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/5 bg-[#111] text-white/70">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">© {new Date().getFullYear()} Swelly</p>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="#" className="hover:text-white">Privacy Policy</Link>
          <Link href="#" className="hover:text-white">Terms</Link>
          <Link href="/invite" className="hover:text-white">Support</Link>
          <a href="https://github.com/" target="_blank" className="hover:text-white" rel="noreferrer">GitHub</a>
        </nav>
      </div>
    </footer>
  );
}
