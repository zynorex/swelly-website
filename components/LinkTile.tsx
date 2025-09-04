"use client";

import Link from 'next/link';
import React from 'react';

type Props = {
  href: string;
  title: string;
  desc?: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconBg?: string;
  external?: boolean;
};

export default function LinkTile({ href, title, desc, Icon, iconBg = 'bg-white/6', external = false }: Props) {
  const handleClick = () => {
    try {
      // lightweight analytics hook
      console.log('link-click', href);
      window.dispatchEvent(new CustomEvent('analytics-link-click', { detail: { href } }));
    } catch {}
  };

  return (
    <Link href={href} legacyBehavior>
      <a
        onClick={handleClick}
        className="flex items-center gap-3 p-3 rounded-md bg-white/3 hover:bg-white/5 border border-white/6 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
      >
        <div className={`${iconBg} w-9 h-9 flex items-center justify-center rounded-md`}>
          <Icon className="w-5 h-5 text-white/90" />
        </div>
        <div>
          <div className="text-sm font-medium">{title}</div>
          {desc && <div className="text-xs text-white/60">{desc}</div>}
        </div>
      </a>
    </Link>
  );
}
