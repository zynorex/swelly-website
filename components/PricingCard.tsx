import React from "react";
import Link from "next/link";
import Sparkles from './Sparkles';

type Props = {
  name: string;
  price: string | { monthly: string; yearly: string };
  features: string[];
  highlight?: boolean;
  cta?: string;
  period?: 'monthly' | 'yearly';
  href?: string;
};

export default function PricingCard({ name, price, features, highlight, cta = "Buy", href, period = 'monthly' }: Props) {
  return (
    <div className="relative">
      {highlight && (
        <div className="absolute -top-4 right-4 text-xs px-3 py-1 rounded-full shadow-lg z-10 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 text-white">
          Most Popular
        </div>
      )}

      <div className={`rounded-2xl overflow-hidden p-6 md:p-8 shadow-2xl relative transform transition hover:scale-[1.02] bg-white/5 backdrop-blur-md ${highlight ? 'border-[1px] border-white/10' : 'border border-white/6'}`}>
        {/* aurora / subtle gradient overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_left,_rgba(99,102,241,0.06),_transparent_30%),radial-gradient(ellipse_at_bottom_right,_rgba(236,72,153,0.04),_transparent_30%)]" />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <h3 className="text-lg md:text-xl font-extrabold tracking-tight uppercase text-white/90">{name}</h3>
            {highlight && <Sparkles className="-translate-y-1" size={14} />}
          </div>
          <div className="mt-3 flex items-baseline gap-3">
            <div className="text-2xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
              {typeof price === 'string' ? price : price[period]}
            </div>
            <div className="text-sm text-white/60">/ {period === 'monthly' ? 'month' : 'year'}</div>
          </div>

          <ul className="mt-6 space-y-3 text-white/80 text-sm">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span className="mt-1 text-gradient text-primary">✓</span>
                <span className="leading-tight">{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            {href ? (
              <Link href={href} className="block w-full text-center bg-white rounded-lg py-3 text-primary font-medium hover:opacity-95">{cta}</Link>
            ) : (
              <button className="block w-full text-center bg-white rounded-lg py-3 text-primary font-medium hover:opacity-95">{cta}</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
