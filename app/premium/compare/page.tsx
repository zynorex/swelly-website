export const metadata = { title: "Premium Compare" };

const rows = [
  { k: "24/7 Music", free: "-", premium: "✓", plus: "✓" },
  { k: "Queue Boost", free: "-", premium: "✓", plus: "✓" },
  { k: "Exclusive Filters", free: "-", premium: "✓", plus: "✓" },
  { k: "Priority Support", free: "-", premium: "✓", plus: "✓" },
];

export default function PremiumComparePage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Premium Tiers Comparison</h1>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-white/60">
            <tr>
              <th className="text-left py-2">Feature</th>
              <th className="text-left py-2">Free</th>
              <th className="text-left py-2">Premium</th>
              <th className="text-left py-2">Premium+</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.k} className="border-t border-white/5">
                <td className="py-2">{r.k}</td>
                <td className="py-2">{r.free}</td>
                <td className="py-2">{r.premium}</td>
                <td className="py-2">{r.plus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
