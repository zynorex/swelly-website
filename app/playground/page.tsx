import CommandPlayground from "@/components/playground/CommandPlayground";
import { getAllCommands } from "@/lib/commands";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Command Playground",
  description: "Try Swelly commands interactively. Simulate running commands and see realistic responses without setting up a bot.",
  openGraph: {
    title: "Swelly Command Playground - Try Commands Live",
    description: "Interactive command simulator for Swelly Discord bot. Test commands, learn syntax, and explore features.",
    images: [
      {
        url: "/swellyG1.png",
        width: 1200,
        height: 630,
        alt: "Swelly Command Playground",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swelly Command Playground",
    description: "Try Swelly commands interactively. Simulate running commands live.",
  },
};

export default function PlaygroundPage() {
  const commands = getAllCommands();
  return <CommandPlayground commands={commands} />;
}
