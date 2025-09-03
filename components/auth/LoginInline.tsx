"use client";
import { signIn } from "next-auth/react";

export default function LoginInline() {
  return (
    <button
      className="btn bg-[#5865F2] hover:bg-[#4752c4] text-white shadow-glow"
      onClick={() => signIn("discord")}
    >
      Login with Discord
    </button>
  );
}
