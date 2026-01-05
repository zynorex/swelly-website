import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Swelly Commands';

export default async function GET() {
  const { width, height } = size;
  
  // Read text.png image
  const imagePath = path.join(process.cwd(), 'public', 'text.png');
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString('base64');
  const imageDataUrl = `data:image/png;base64,${base64Image}`;

  return new ImageResponse(
    (
      <div
        style={{
          width,
          height,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 48,
          background: 'linear-gradient(135deg, #0d0d10, #1a0202, #140606)',
        }}
      >
        <img src={imageDataUrl} alt="Swelly" style={{ height: 120, objectFit: 'contain' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 72, fontWeight: 900, color: '#fff' }}>Commands</div>
          <div style={{ fontSize: 28, color: '#e5e7eb' }}>Explore powerful music commands</div>
        </div>
        <div style={{ display: 'flex', gap: 16, color: '#e5e7eb', fontSize: 20, justifyContent: 'center' }}>
          <div>Play • Pause • Queue • Skip • Volume • Loop</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
