"use client";

type Row = { name: string; value: number; max: number };

export default function LeaderboardChart({ rows, color = "#4a9d5b" }: { rows: Row[]; color?: string }) {
  return (
    <div className="space-y-2">
      {rows.map(({ name, value, max }) => (
        <div key={name} className="flex items-center gap-3">
          <span className="font-mono shrink-0 text-right" style={{fontSize:10, color:"#505549", width:160}}>
            {name.replace(/\./g, " › ")}
          </span>
          <div className="flex-1 h-5 rounded-sm overflow-hidden" style={{background:"#1a1d1b"}}>
            <div
              className="h-full rounded-sm transition-all"
              style={{ width: `${(value / max) * 100}%`, background: color, opacity: 0.85 }}
            />
          </div>
          <span className="font-mono shrink-0 w-10 text-right" style={{fontSize:10, color:"#d4cfc6"}}>{value}</span>
        </div>
      ))}
    </div>
  );
}
