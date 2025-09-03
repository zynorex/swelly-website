import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const SUB_FILE = path.join(DATA_DIR, "subscribers.json");

function isValidEmail(email: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body.email || "").toString().trim().toLowerCase();
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Ensure data dir exists
    await fs.mkdir(DATA_DIR, { recursive: true });

    // Read existing subscribers
    let list: string[] = [];
    try {
      const raw = await fs.readFile(SUB_FILE, "utf8");
      list = JSON.parse(raw) as string[];
      if (!Array.isArray(list)) list = [];
    } catch {
      // ignore - we'll create file
      list = [];
    }

    if (list.includes(email)) {
      return NextResponse.json({ ok: true, already: true }, { status: 200 });
    }

    list.push(email);
    await fs.writeFile(SUB_FILE, JSON.stringify(list, null, 2), "utf8");

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err: unknown) {
    const msg = (err as Error)?.message ?? String(err);
    console.error("/api/subscribe error:", msg);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
