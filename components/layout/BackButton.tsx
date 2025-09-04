"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function BackButton({ href }: { href?: string }) {
  const router = useRouter();
  const goBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (href) router.push(href);
    else router.back();
  };
  return (
    <button
      onClick={goBack}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 text-sm text-white/80 hover:bg-white/5"
      aria-label="Go back"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
      </svg>
      <span>Back</span>
    </button>
  );
}
