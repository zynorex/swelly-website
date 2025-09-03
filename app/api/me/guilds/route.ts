import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  const accessToken = (session as any)?.accessToken as string | undefined;
  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const res = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: 0 },
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch guilds" }, { status: res.status });
    }
  const guilds = await res.json();
  const filtered = guilds.filter((g: any) => g.owner || ((g.permissions ?? 0) & 0x20) !== 0);
  return NextResponse.json(filtered);
  } catch (e) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
