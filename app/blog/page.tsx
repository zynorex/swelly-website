export const metadata = { title: "Blog" };

const posts = [
  { id: 1, title: "Swelly v2.1: New Filters", date: "2025-08-10", excerpt: "We added chorus and phaser filters…" },
  { id: 2, title: "Maintenance 8/15", date: "2025-08-15", excerpt: "Short downtime for database upgrades." },
];

export default function BlogPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Updates</h1>
      <div className="space-y-4">
        {posts.map((p) => (
          <article key={p.id} className="card">
            <div className="text-white/50 text-sm">{p.date}</div>
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p className="text-white/70">{p.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
