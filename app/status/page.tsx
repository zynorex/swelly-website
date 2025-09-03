"use client";
import { useEffect, useState } from "react";

type Status = {
  online: boolean;
  uptime: string;
  uptimePercent: number;
  latencyMs: number;
  shardsCount: number;
  shards: { id: number; status: string; guilds: number; ping: number }[];
};

export default function StatusPage() {
  const [data, setData] = useState<Status | null>(null);
  useEffect(() => {
    fetch("/api/status")
      .then((r) => r.json())
      .then(setData)
      .catch(() =>
        setData({ online: false, uptime: "-", uptimePercent: 0, latencyMs: 0, shardsCount: 0, shards: [] })
      );
  }, []);
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Status</h1>
      {!data ? (
        <div>Loading status…</div>
      ) : (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card">
              <div className="text-sm text-white/60">Bot Status</div>
              <div className="mt-1">
                <span className={`inline-flex items-center gap-2 text-sm px-2 py-1 rounded-full ${data.online ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                  <span className={`h-2 w-2 rounded-full ${data.online ? "bg-green-400" : "bg-red-400"}`} />
                  {data.online ? "Online" : "Offline"}
                </span>
              </div>
            </div>
            <div className="card">
              <div className="text-sm text-white/60">Uptime</div>
              <div className="text-2xl font-bold">{data.uptime}</div>
              <div className="text-white/60 text-sm">{data.uptimePercent}%</div>
            </div>
            <div className="card">
              <div className="text-sm text-white/60">Shards</div>
              <div className="text-2xl font-bold">{data.shardsCount} active</div>
            </div>
            <div className="card">
              <div className="text-sm text-white/60">Latency</div>
              <div className="text-2xl font-bold">{data.latencyMs} ms</div>
            </div>
          </div>
          <div className="card overflow-x-auto">
            <div className="font-semibold mb-3">Shard Details</div>
            <table className="w-full text-sm">
              <thead className="text-white/60">
                <tr>
                  <th className="text-left py-2">Shard</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Guilds</th>
                  <th className="text-left py-2">Ping</th>
                </tr>
              </thead>
              <tbody>
                {data.shards.map((s) => (
                  <tr key={s.id} className="border-t border-white/5">
                    <td className="py-2">#{s.id}</td>
                    <td className="py-2 capitalize">{s.status}</td>
                    <td className="py-2">{s.guilds.toLocaleString()}</td>
                    <td className="py-2">{s.ping} ms</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
