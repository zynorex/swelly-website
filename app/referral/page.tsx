export const metadata = { title: "Referral" };

export default function ReferralPage() {
  const invite = process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || "#";
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Referral Program</h1>
      <p className="text-white/70 mb-4">Invite Swelly and earn perks or premium trials.</p>
      <div className="flex gap-3">
        <a href={invite} target="_blank" rel="noreferrer" className="btn btn-primary">Invite Swelly</a>
        <button className="btn btn-outline">Copy Referral Link</button>
      </div>
      <div className="card mt-6 text-white/70">Referral stats placeholder.</div>
    </div>
  );
}
