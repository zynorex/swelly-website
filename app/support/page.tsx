export const metadata = { title: "Support" };

export default function SupportPage() {
  const supportUrl = process.env.NEXT_PUBLIC_DISCORD_SUPPORT_URL || "#";
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-4">Support</h1>
      <p className="text-white/70 mb-6">Join our Discord server or open a ticket for help.</p>
      <div className="flex gap-3">
        <a href={supportUrl} target="_blank" rel="noreferrer" className="btn btn-primary">Join Support Server</a>
        <a href="#" className="btn btn-outline">Open Ticket (Embed)</a>
      </div>
      <div className="card mt-8 text-white/70">Ticket system embed placeholder.</div>
    </div>
  );
}
