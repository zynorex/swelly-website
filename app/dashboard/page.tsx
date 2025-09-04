"use client";
import { useSession } from "next-auth/react";
import LoginInline from "@/components/auth/LoginInline";
import LoadingSpinner from "@/components/LoadingSpinner";
// ...existing imports...

export default function DashboardPage() {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="container py-12">
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (status !== "authenticated")
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-white/70 mb-6">Login with Discord to manage your servers.</p>
        <LoginInline />
      </div>
    );

  return (
    <div className="container py-12">
      <div className="rounded-xl overflow-hidden bg-white/4 backdrop-blur-md p-8 text-center">
  <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Dashboard - Under construction</h1>
  <p className="text-white/70 max-w-2xl mx-auto mb-4">We&apos;re busy building a better dashboard experience. For now the dashboard is under construction — features like per-server settings, payment management, and advanced playback controls will arrive soon.</p>
        <div className="flex items-center justify-center gap-3 mt-4">
          <a href="/invite" className="btn btn-primary">Invite Bot</a>
          <a href={process.env.NEXT_PUBLIC_DISCORD_SUPPORT_URL || '#'} target="_blank" rel="noreferrer" className="btn btn-outline">Join Support</a>
        </div>

        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          <div className="card text-center">
            <div className="font-semibold">What&apos;s coming</div>
            <ul className="text-sm text-white/70 mt-2 space-y-1">
              <li>Per-server configuration</li>
              <li>Stripe subscriptions & billing</li>
              <li>Now playing controls & queue management</li>
            </ul>
          </div>
          <div className="card text-center">
            <div className="font-semibold">ETA</div>
            <div className="text-white/70 mt-2">Rolling out over the next few weeks. Follow updates in the support server.</div>
          </div>
          <div className="card text-center">
            <div className="font-semibold">Need access?</div>
            <div className="text-white/70 mt-2">If you need early access or have feedback, drop a message in support.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
