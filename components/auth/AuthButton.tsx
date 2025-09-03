"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (loading) {
    return (
      <button className="btn btn-outline opacity-70 cursor-wait" disabled>
        Loading...
      </button>
    );
  }

  if (!session) {
    return (
      <button
  className="btn bg-[#5865F2] hover:bg-[#4752c4] text-white shadow-glow w-full sm:w-auto"
        onClick={() => signIn("discord")}
      >
        Login with Discord
      </button>
    );
  }
  const user = session.user!;
  return (
    <div className="flex items-center gap-3">
      {user.image && (
        <Image
          src={user.image}
          alt={user.name ?? "User"}
          width={28}
          height={28}
          className="rounded-full"
        />
      )}
  <span className="text-sm text-white/80 hidden sm:block">{user.name}</span>
  <Link href="/servers" className="btn btn-outline hidden md:inline-flex">My Servers</Link>
  <button className="btn btn-outline hidden sm:inline-flex" onClick={() => signOut()}>Sign out</button>
  {/* On very small screens show a compact sign-out button */}
  <button className="btn btn-outline sm:hidden" onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
