import React from "react";
import Link from "next/link";

type Props = {
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
  cta?: string;
  href?: string;
};

export default function PricingCard({ name, price, features, highlight, cta = "Buy", href }: Props) {
  return (
    <div className="relative">
      {highlight && (
        <div className="absolute -top-3 right-4 text-xs bg-primary text-white px-3 py-1 rounded-full shadow-md z-10">Most Popular</div>
      )}
      <div className={`card ${highlight ? "border-primary/40" : ""}`}>
        <h3 className="text-xl font-semibold">{name}</h3>
        <div className="text-3xl font-extrabold mt-2">{price}</div>
        <ul className="mt-4 space-y-2 text-white/80 text-sm">
          {features.map((f) => (
            <li key={f}>• {f}</li>
          ))}
        </ul>
        {href ? (
          <Link href={href} className={`btn w-full mt-6 ${highlight ? "btn-primary" : "btn-outline"}`}>{cta}</Link>
        ) : (
          <button className={`btn w-full mt-6 ${highlight ? "btn-primary" : "btn-outline"}`}>{cta}</button>
        )}
      </div>
    </div>
  );
}
