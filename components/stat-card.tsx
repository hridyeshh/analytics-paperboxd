type Props = {
  label: string;
  value: number | string;
  delta?: string;
  deltaUp?: boolean;
  sub?: string;
  live?: boolean;
};

export default function StatCard({ label, value, delta, deltaUp, sub, live }: Props) {
  return (
    <div className="rounded-lg p-4" style={{background:"#131614", border:"1px solid #1e2120"}}>
      <div className="flex items-center gap-1.5 mb-3">
        {live && <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse shrink-0" />}
        <span className="font-mono uppercase tracking-widest" style={{fontSize:9, color:"#505549"}}>{label}</span>
      </div>
      <div className="flex items-end gap-2">
        <span className="font-mono font-bold" style={{fontSize:28, lineHeight:1, color:"#d4cfc6", letterSpacing:"-0.02em"}}>
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
        {delta && (
          <span className="font-mono mb-0.5" style={{fontSize:10, color: deltaUp ? "#4a9d5b" : "#c45a4d"}}>
            {deltaUp ? "▲" : "▼"} {delta}
          </span>
        )}
      </div>
      {sub && <p className="font-mono mt-1.5" style={{fontSize:10, color:"#3a3d38"}}>{sub}</p>}
    </div>
  );
}
