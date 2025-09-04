"use client";
import { useEffect, useState } from "react";
import CountUp from "./CountUp";

type Totals = { guilds: number; users: number } | null;

export default function HomeStats({ initial }: { initial?: Totals }) {
  const [totals, setTotals] = useState<Totals>(initial ?? null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const r = await fetch('/api/status');
        if (!r.ok) throw new Error(`status ${r.status}`);
        const j = await r.json();
        const guilds = j?.totals?.guilds ?? j?.guilds ?? j?.guildsTotal ?? null;
        const users = j?.totals?.users ?? j?.users ?? j?.usersTotal ?? null;
        if (mounted) setTotals({ guilds: Number(guilds ?? 0), users: Number(users ?? 0) });
      } catch (e) {
        // swallow - keep initial or fallback
        // eslint-disable-next-line no-console
        console.warn('HomeStats: failed to fetch /api/status', e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const guilds = totals?.guilds ?? 12340;
  const users = totals?.users ?? 1005221;

  return (
    <div className="space-y-4">
      <div className="card text-center">
        <div className="text-3xl font-bold text-primary">
          <CountUp to={guilds} />
        </div>
        <div className="text-white/70 mt-1">Servers</div>
      </div>
      <div className="card text-center">
        <div className="text-3xl font-bold text-primary">
          <CountUp to={users} />
        </div>
        <div className="text-white/70 mt-1">Users</div>
      </div>
    </div>
  );
}
