"use client";
import { useRouter } from "next/navigation";

type Props = { title: string; sub?: string; };

export default function PageHeader({ title, sub }: Props) {
  const router = useRouter();
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric", year:"numeric" });

  return (
    <div className="flex items-start justify-between mb-7">
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green" />
          <span className="text-muted font-mono" style={{fontSize:9, letterSpacing:"0.12em", textTransform:"uppercase"}}>
            Analytics &rsaquo; paperboxd.in
          </span>
        </div>
        <h1 style={{fontFamily:'"Playfair Display",serif', fontSize:26, color:"#d4cfc6", fontWeight:600, lineHeight:1.2}}>
          {title}
        </h1>
        {sub && <p className="text-muted font-mono mt-1" style={{fontSize:10}}>{sub}</p>}
      </div>
      <div className="flex items-center gap-3 pt-1">
        <span className="text-muted font-mono" style={{fontSize:10}}>{dateStr}</span>
        <button
          onClick={() => router.refresh()}
          className="flex items-center gap-1.5 font-mono text-xs px-2.5 py-1.5 rounded transition-colors"
          style={{color:"#505549", border:"1px solid #1e2120", background:"#131614"}}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 5a4 4 0 1 1 .5 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M1 7.5V5h2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          refresh
        </button>
      </div>
    </div>
  );
}
