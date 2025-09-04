import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { FaLifeRing, FaCrown, FaListAlt, FaServer } from 'react-icons/fa';
import LinkTile from '@/components/LinkTile';

export const metadata = { title: "Server Settings" };

export default function GuildSettingsPage({ params }: { params: { guildId: string } }) {
  const { guildId } = params;
  return (
    <>
      <PageHeader
        title="Server Settings"
        subtitle={`This server page is under construction.`}
        right={<span className="text-xs bg-white/10 px-2 py-1 rounded">ID: {guildId}</span>}
      />
      <div className="container py-10">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card">
            <h3 className="font-semibold">Quick actions</h3>
            <p className="text-white/60 text-sm mb-3">Useful links for server admins.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link href="/servers" className="btn btn-outline">Back to Servers</Link>
              <a href="/invite" className="btn btn-primary">Invite Swelly</a>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold">Important links</h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <LinkTile href="/support" title="Support Server" desc="Get help and updates" Icon={FaLifeRing} iconBg="bg-rose-500/20" />
              <LinkTile href="/premium" title="Premium" desc="Upgrade for extras" Icon={FaCrown} iconBg="bg-yellow-500/20" />
              <LinkTile href="/commands" title="Commands" desc="Reference & shortcuts" Icon={FaListAlt} iconBg="bg-indigo-500/20" />
              <LinkTile href="/status" title="Status" desc="Realtime status" Icon={FaServer} iconBg="bg-cyan-500/20" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
