import { NextResponse } from "next/server";

type ShardStatus = "operational" | "partial" | "outage";

/**
 * Bot Status API Endpoint
 * Returns comprehensive bot metrics and shard status
 * 
 * Used by:
 * - Status page (shard monitoring)
 * - Dashboard (statistics cards)
 * - Home page (live stats)
 * 
 * Cache-Control: 10s revalidate, 30s stale-while-revalidate for optimal freshness
 */
export async function GET() {
  try {
    // Generate shard data
    // In production, fetch from your bot's metrics service or database
    const total = 54;
    const shards = Array.from({ length: total }, (_, i) => {
      // Faux variation: every 17th shard partial, every 29th outage
      let status: ShardStatus = "operational";
      if (i % 29 === 0) status = "outage";
      else if (i % 17 === 0) status = "partial";
      const guilds = 300 + (i * 23) % 700;
      const ping = 35 + (i * 7) % 40;
      return { id: i, status, guilds, ping };
    });

    // Calculate totals
    const guildsTotal = shards.reduce((a, s) => a + s.guilds, 0);
    const usersTotal = Math.round(guildsTotal * 185.4); // mock multiplier
    const ramMB = 56000 + (total * 80);

    // Dashboard-specific metrics
    const dashboardMetrics = {
      uptimePercent: 99.95,
      latencyMs: 48,
      commandsExecuted24h: 7_500_000,
      topCommands: [
        { name: "play", usage: 2_840_000, trend: 12 },
        { name: "skip", usage: 1_920_000, trend: 8 },
        { name: "queue", usage: 1_650_000, trend: 5 },
        { name: "pause", usage: 1_420_000, trend: 3 },
        { name: "nowplaying", usage: 1_280_000, trend: -2 },
        { name: "volume", usage: 980_000, trend: 6 },
        { name: "shuffle", usage: 850_000, trend: 11 },
        { name: "repeat", usage: 720_000, trend: 4 },
        { name: "search", usage: 580_000, trend: 15 },
        { name: "playlist", usage: 450_000, trend: 9 },
      ],
    };

    const data = {
      // Core status
      online: true,
      uptime: "3d 12h 05m",

      // Metrics for dashboard
      dashboard: dashboardMetrics,

      // Legacy fields (kept for backward compatibility)
      uptimePercent: dashboardMetrics.uptimePercent,
      latencyMs: dashboardMetrics.latencyMs,

      // Shard information
      shardsCount: shards.length,
      shards,

      // Aggregated totals
      totals: {
        guilds: guildsTotal,
        users: usersTotal,
        ramMB,
      },

      // Metadata
      timestamp: new Date().toISOString(),
      version: "1.1.0",
    };

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "s-maxage=10, stale-while-revalidate=30",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Status API error:", error);
    return NextResponse.json(
      {
        online: false,
        error: "Failed to fetch status",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
