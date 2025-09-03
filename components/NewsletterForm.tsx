"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setStatus("error");
    setStatus("sending");
    try {
      // Placeholder: client-only optimistic UI. Hook up API route later.
      await new Promise((r) => setTimeout(r, 700));
      setStatus("sent");
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={submit} className="max-w-xl mx-auto mt-8 flex gap-3 items-center">
      <input
        type="email"
        className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email address"
      />
      <button className="btn btn-primary" disabled={status === "sending" || status === "sent"}>
        {status === "sending" ? "Sending..." : status === "sent" ? "Subscribed" : "Subscribe"}
      </button>
    </form>
  );
}
