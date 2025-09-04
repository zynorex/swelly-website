"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const STORAGE_KEY = 'mobileCta:hidden';

export default function MobileCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [persistHidden, setPersistHidden] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (saved === 'true') {
      setPersistHidden(true);
      setVisible(false);
    } else {
      setVisible(true);
    }
    // trigger entrance animation after mount
    requestAnimationFrame(() => setMounted(true));
  }, []);

  useEffect(() => {
    if (!pathname) return;
    const hideRoutes = ['/dashboard', '/invite'];
    const shouldHide = hideRoutes.some((r) => pathname.startsWith(r));
    if (shouldHide) {
      // auto-hide without persisting
      setAnimatingOut(true);
      const t = setTimeout(() => {
        setVisible(false);
        setAnimatingOut(false);
      }, 260);
      return () => clearTimeout(t);
    } else {
      if (!persistHidden) setVisible(true);
    }
  }, [pathname, persistHidden]);

  useEffect(() => {
    const onRestore = () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
      setPersistHidden(false);
      setVisible(true);
      setMounted(true);
    };
    window.addEventListener('mobile-cta-restore', onRestore);
    return () => window.removeEventListener('mobile-cta-restore', onRestore);
  }, []);

  const handleClose = () => {
    setAnimatingOut(true);
    setTimeout(() => {
      setVisible(false);
      setPersistHidden(true);
      if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, 'true');
      setAnimatingOut(false);
    }, 260);
  };

  if (!visible) return null;

  const containerClass = `fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[min(960px,calc(100%-2rem))] max-w-xl sm:hidden transition-transform transition-opacity duration-260 ${animatingOut ? 'opacity-0 translate-y-4' : mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`;

  return (
    <div className={containerClass} role="region" aria-label="Mobile quick actions">
      <div className="bg-white/5 backdrop-blur-sm border border-white/6 rounded-full px-3 py-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link href="/invite" className="btn btn-primary px-4 py-2">Invite</Link>
          <Link href="/dashboard" className="btn btn-outline px-4 py-2">Dashboard</Link>
        </div>

        <div className="flex items-center gap-3">
          <a href={process.env.NEXT_PUBLIC_DISCORD_SUPPORT_URL || '#'} className="text-sm text-white/70 hover:text-white/90" target="_blank" rel="noreferrer">Support</a>
          <button
            aria-label="Dismiss"
            onClick={handleClose}
            className="text-white/60 hover:text-white/90 rounded-full p-1"
            title="Dismiss"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
