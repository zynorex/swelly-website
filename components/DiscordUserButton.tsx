"use client";
import { useEffect, useState } from "react";

type Props = {
  id: string;
  className?: string;
  stopPropagation?: boolean;
};

export default function DiscordUserButton({ id, className, stopPropagation = true }: Props) {
  const [label, setLabel] = useState<string>("Discord");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/discord-user/${id}`);
        if (!res.ok) return;
        const data = await res.json();
        const name = data?.global_name || data?.username;
        if (!cancelled && name) setLabel(`@${name}`);
      } catch {
        // ignore; keep default label
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <a
      href={`https://discord.com/users/${id}`}
      target="_blank"
      rel="noreferrer"
      className={className}
      onClick={stopPropagation ? (e) => e.stopPropagation() : undefined}
    >
      {label}
    </a>
  );
}
