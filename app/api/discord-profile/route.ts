import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !(session as any).accessToken) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  }
  const token = (session as any).accessToken as string;
  const res = await fetch("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const txt = await res.text();
    return new Response(JSON.stringify({ error: "Failed to fetch", details: txt }), { status: 502 });
  }
  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 200 });
}
