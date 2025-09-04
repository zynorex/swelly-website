"use client";

import React from 'react';

export default function MobileCtaRestore() {
  const handleRestore = () => {
    try {
      localStorage.removeItem('mobileCta:hidden');
      window.dispatchEvent(new CustomEvent('mobile-cta-restore'));
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={handleRestore}
      className="text-xs text-white/60 underline ml-2 sm:hidden"
    >
      Show quick actions
    </button>
  );
}
