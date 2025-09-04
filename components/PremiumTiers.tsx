"use client";
import React, { useState } from 'react';
import PricingCard from './PricingCard';

type Tier = {
  name: string;
  price: { monthly: string; yearly: string } | string;
  features: string[];
  highlight?: boolean;
  cta?: string;
  href?: string;
};

export default function PremiumTiers({ tiers, initial = 'monthly' }: { tiers: Tier[]; initial?: 'monthly' | 'yearly' }) {
  const [period, setPeriod] = useState<'monthly' | 'yearly'>(initial);

  return (
    <div>
      <div className="flex items-center justify-center mb-6">
        <div className="inline-flex rounded-full bg-white/6 p-1 backdrop-blur-sm border border-white/6">
          <button
            onClick={() => setPeriod('monthly')}
            className={`px-4 py-2 rounded-full transition-all ${period === 'monthly' ? 'bg-white text-primary shadow-sm' : 'text-white/80'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setPeriod('yearly')}
            className={`px-4 py-2 rounded-full transition-all ${period === 'yearly' ? 'bg-white text-primary shadow-sm' : 'text-white/80'}`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {tiers.map((t) => (
          <div key={t.name} className="transform transition hover:-translate-y-1">
            <PricingCard
              name={t.name}
              price={t.price}
              features={t.features}
              highlight={t.highlight}
              cta={t.cta}
              href={t.href}
              period={period}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
