import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  const maybeToken = (session as unknown as { accessToken?: string })?.accessToken;
  if (!session || !maybeToken) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  }
  const token = maybeToken;
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
