export const metadata = { title: "Leaderboard" };

const ranks = [
  { id: 1, name: "Guild Alpha", score: 5120 },
  { id: 2, name: "Guild Beta", score: 4433 },
  { id: 3, name: "Guild Gamma", score: 4012 },
];

export default function LeaderboardPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      <div className="space-y-3">
        {ranks.map((r, idx) => (
          <div key={r.id} className="card flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/30 text-primary flex items-center justify-center font-bold">{idx + 1}</div>
              <div className="font-semibold">{r.name}</div>
            </div>
            <div className="text-white/70">{r.score.toLocaleString()} pts</div>
          </div>
        ))}
      </div>
    </div>
  );
}
