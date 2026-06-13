type StatCardProps = {
  label: string;
  value: number | string;
  sub?: string;
  accent?: "green" | "amber" | "rose" | "default";
};

const accents = {
  green:   "text-green",
  amber:   "text-amber",
  rose:    "text-rose",
  default: "text-ink",
};

export default function StatCard({ label, value, sub, accent = "default" }: StatCardProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-5">
      <p className="text-muted font-mono text-xs uppercase tracking-widest mb-3">{label}</p>
      <p className={`font-mono text-3xl font-bold leading-none ${accents[accent]}`}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
      {sub && <p className="text-muted font-mono text-xs mt-2">{sub}</p>}
    </div>
  );
}
