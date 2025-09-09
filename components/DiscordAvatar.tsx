"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  id: string;
  alt: string;
  size?: number;
  className?: string;
  fallbackSrc?: string;
  avatarHashHint?: string | null;
};

export default function DiscordAvatar({ id, alt, size = 112, className, fallbackSrc, avatarHashHint }: Props) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      // If we have a hint (hash), we can build the CDN URL directly.
      if (avatarHashHint) {
        const fmt = String(avatarHashHint).startsWith("a_") ? "gif" : "png";
        const url = `https://cdn.discordapp.com/avatars/${id}/${avatarHashHint}.${fmt}?size=256`;
        if (!cancelled) setSrc(url);
        return;
      }
      try {
        const res = await fetch(`/api/discord-user/${id}`);
        if (!res.ok) throw new Error(`status ${res.status}`);
        const data = await res.json();
        const url: string | null = data.avatarUrl || data.defaultAvatarUrl || null;
        if (!cancelled) setSrc(url);
      } catch {
        if (!cancelled) setSrc(fallbackSrc ?? null);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [id, avatarHashHint, fallbackSrc]);

  const finalSrc = src || fallbackSrc || "/mascot.png";
  return (
    <Image
      src={finalSrc}
      alt={alt}
      width={size}
      height={size}
      className={className}
    />
  );
}
