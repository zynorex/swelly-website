"use client";
import { useState } from "react";

export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((it, idx) => (
        <div key={idx} className="card">
          <button
            className="w-full text-left flex items-center justify-between gap-3"
            onClick={() => setOpen(open === idx ? null : idx)}
          >
            <span className="font-semibold">{it.q}</span>
            <span className="text-white/50">{open === idx ? "−" : "+"}</span>
          </button>
          {open === idx && (
            <div className="text-white/70 text-sm mt-3">{it.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}
