import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function toTitle(name: string) {
  try { return name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()); } catch { return name; }
}

export default async function GET(req: NextRequest, { params }: { params: { name: string } }) {
  const { width, height } = size;
  const title = toTitle(params.name ?? 'Command');
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
          <div style={{ width: 24, height: 24, borderRadius: 8, background: 'linear-gradient(90deg,#ef4444,#f97316)' }} />
          <div style={{ fontSize: 44, color: '#fff', fontWeight: 800 }}>Swelly</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 64, fontWeight: 900, color: '#fff' }}>{title}</div>
          <div style={{ fontSize: 28, color: '#e5e7eb' }}>Discord music command</div>
        </div>
        <div style={{ display: 'flex', gap: 16, color: '#e5e7eb', fontSize: 24 }}>
          <div>Use Swelly to play high‑quality music in your server.</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
