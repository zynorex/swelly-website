"use client";
import { useMemo, useState } from "react";

export type Command = {
  name: string;
  description: string;
  category: "Music" | "Filters" | "Utility" | "Premium";
  usage?: string;
};

export default function CommandSearch({ commands }: { commands: Command[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const categories = ["All", "Music", "Filters", "Utility", "Premium"];

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return commands.filter((c) => {
      const inCat = category === "All" || c.category === (category as Command["category"]);
      const inText =
        c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
      return inCat && inText;
    });
  }, [commands, query, category]);

  const groups = useMemo(() => {
    const cats = ["Music", "Filters", "Utility", "Premium"] as const;
    const map: Record<(typeof cats)[number], Command[]> = {
      Music: [], Filters: [], Utility: [], Premium: [],
    };
    for (const c of filtered) map[c.category].push(c);
    return { cats, map };
  }, [filtered]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          className="w-full sm:flex-1 bg-[#0f0f0f] border border-white/10 rounded-md px-3 py-2 outline-none focus:border-primary"
          placeholder="Search commands..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="sm:w-48 bg-[#0f0f0f] border border-white/10 rounded-md px-3 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      {groups.cats.map((cat) => (
        groups.map[cat].length === 0 ? null : (
          <section key={cat} className="mb-8">
            <h2 className="text-xl font-semibold mb-3">{cat}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groups.map[cat].map((cmd) => (
                <div key={cmd.name} className="card">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">/{cmd.name}</h3>
                    <span className="text-xs text-white/50">{cmd.category}</span>
                  </div>
                  <p className="text-white/80 text-sm">{cmd.description}</p>
                  {cmd.usage && (
                    <p className="text-xs text-white/50 mt-2">Usage: {cmd.usage}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )
      ))}
    </div>
  );
}
