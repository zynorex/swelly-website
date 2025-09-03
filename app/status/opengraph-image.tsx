import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Swelly Status';

export default async function GET(req: NextRequest) {
  const { width, height } = size;
  let totals = { guilds: 0, users: 0, ramMB: 0 };
  const counts = { operational: 0, partial: 0, outage: 0 } as Record<string, number>;
  try {
    const url = new URL(req.url);
    const res = await fetch(`${url.origin}/api/status`, { cache: 'no-store' });
    const data = await res.json();
    if (Array.isArray(data?.shards)) {
      for (const s of data.shards as Array<{ status?: string }>) {
        const k = s.status === 'operational' || s.status === 'partial' || s.status === 'outage' ? s.status : 'operational';
        counts[k] = (counts[k] ?? 0) + 1;
      }
    }
    if (data?.totals) totals = data.totals;
  } catch {}

  return new ImageResponse(
    (
      <div
        style={{
          width,
          height,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 48,
          background: 'linear-gradient(135deg, #0d0d10, #1a0202, #140606)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 8,
              background: 'linear-gradient(90deg,#ef4444,#f97316)',
            }}
          />
          <div style={{ fontSize: 44, color: '#fff', fontWeight: 800 }}>Swelly</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 72, fontWeight: 900, color: '#fff' }}>Status</div>
          <div style={{ display: 'flex', gap: 24, color: '#e5e7eb' }}>
            <div style={{ fontSize: 28 }}>
              <span style={{ color: '#7dd3fc' }}>Operational</span>: {counts.operational}
            </div>
            <div style={{ fontSize: 28 }}>
              <span style={{ color: '#fbbf24' }}>Partial</span>: {counts.partial}
            </div>
            <div style={{ fontSize: 28 }}>
              <span style={{ color: '#f0abfc' }}>Outage</span>: {counts.outage}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 32, color: '#e5e7eb' }}>
          <div style={{ fontSize: 24 }}>Guilds: <b style={{ color: '#fff' }}>{totals.guilds.toLocaleString?.() ?? totals.guilds}</b></div>
          <div style={{ fontSize: 24 }}>Users: <b style={{ color: '#fff' }}>{totals.users.toLocaleString?.() ?? totals.users}</b></div>
          <div style={{ fontSize: 24 }}>RAM: <b style={{ color: '#fff' }}>{totals.ramMB.toLocaleString?.() ?? totals.ramMB} MB</b></div>
        </div>
      </div>
    ),
    { ...size }
  );
}
