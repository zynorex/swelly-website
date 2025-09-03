import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const body = await req.text();
  // CSP reports may be sent as application/csp-report or application/json
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    // If parsing fails, wrap raw text
    payload = { raw: body };
  }

  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  const file = path.join(dataDir, 'csp-reports.json');
  let reports: unknown[] = [];
  if (fs.existsSync(file)) {
    try {
      const existing = fs.readFileSync(file, 'utf8');
      reports = JSON.parse(existing) as unknown[];
    } catch {
      // ignore parse errors and overwrite
      reports = [];
    }
  }

  reports.push({ receivedAt: new Date().toISOString(), report: payload });
  fs.writeFileSync(file, JSON.stringify(reports, null, 2), 'utf8');

  // Return 204 No Content to the browser
  return new NextResponse(null, { status: 204 });
}
