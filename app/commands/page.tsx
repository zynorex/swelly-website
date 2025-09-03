import CommandSearch, { Command } from "@/components/CommandSearch";
import { getAllCommands } from "@/lib/commands";

export const metadata = { title: "Commands" };

export default async function CommandsPage() {
  const commands: Command[] = getAllCommands();
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Commands</h1>
  <p className="text-white/70 mb-6">Search and filter all Swelly commands. Click a command to see example usage.</p>
      <CommandSearch commands={commands} />
    </div>
  );
}
