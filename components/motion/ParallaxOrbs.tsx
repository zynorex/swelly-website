"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ParallaxOrbs() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx; // -1..1
      const dy = (e.clientY - cy) / cy; // -1..1
      setPos({ x: dx, y: dy });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const orb = (key: string, size: number, colors: [string, string], strength = 40, extra = "") => (
    <motion.div
      key={key}
      className={`absolute rounded-full blur-3xl opacity-30 ${extra}`}
      style={{ width: size, height: size, background: `radial-gradient(circle at 30% 30%, ${colors[0]}, ${colors[1]})` }}
      animate={{ x: pos.x * strength, y: pos.y * strength }}
      transition={{ type: "spring", stiffness: 40, damping: 20 }}
    />
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {orb("a", 420, ["#ef4444", "rgba(239,68,68,0)"] as [string, string], 30, "top-[-10%] left-[-10%]")}
      {orb("b", 380, ["#f97316", "rgba(249,115,22,0)"] as [string, string], 45, "bottom-[-15%] right-[-10%]")}
      {orb("c", 320, ["#f43f5e", "rgba(244,63,94,0)"] as [string, string], 20, "top-[20%] right-[15%]")}
    </div>
  );
}
