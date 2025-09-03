import { NextResponse } from "next/server";

export async function GET() {
  // Mock data; in production, fetch from your bot API
  const shards = Array.from({ length: 5 }, (_, i) => ({ id: i, status: "online", guilds: 1200 + i * 17, ping: 42 + i }));
  const data = {
    online: true,
    uptime: "3d 12h 05m",
    uptimePercent: 99.95,
    latencyMs: 48,
    shardsCount: shards.length,
    shards,
  };
  return NextResponse.json(data, { headers: { "Cache-Control": "s-maxage=10, stale-while-revalidate=30" } });
}
