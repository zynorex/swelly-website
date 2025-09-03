"use client";
import { useEffect } from "react";

export default function RevealObserver() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    document.body.classList.add("reveal-ready");
    const els = new Set<HTMLElement>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) el.classList.add("is-visible");
        }
      },
      { threshold: 0.12 }
    );
    const scan = (root: ParentNode = document) => {
      root.querySelectorAll<HTMLElement>('[data-reveal-card]').forEach((el) => {
        if (els.has(el)) return;
        els.add(el);
        io.observe(el);
      });
    };
    scan();

    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches?.('[data-reveal-card]')) io.observe(node);
          else scan(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      els.forEach((el) => io.unobserve(el));
      io.disconnect();
      mo.disconnect();
      els.clear();
    };
  }, []);
  return null;
}
