import PageHeader from "@/components/page-header";
import SectionLabel from "@/components/section-label";
import { getDiscovery, type DiscoveryFunnel } from "@/lib/analytics";

export const revalidate = 300;

const pct = (v: number) => `${(v * 100).toFixed(1)}%`;

function KpiCard({ label, value, sub, accent = false }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className="rounded-lg p-4" style={{ background: accent ? "rgba(74,157,91,0.07)" : "#131614", border: `1px solid ${accent ? "rgba(74,157,91,0.25)" : "#1e2120"}` }}>
      <p className="font-mono uppercase tracking-widest mb-2" style={{ fontSize: 9, color: "#505549" }}>{label}</p>
      <p className="font-mono font-bold" style={{ fontSize: 26, color: accent ? "#4a9d5b" : "#d4cfc6", lineHeight: 1, letterSpacing: "-0.02em" }}>{value}</p>
      {sub && <p className="font-mono mt-1.5" style={{ fontSize: 10, color: "#3a3d38" }}>{sub}</p>}
    </div>
  );
}

function Row({ f, emphasis = false }: { f: DiscoveryFunnel; emphasis?: boolean }) {
  const color = emphasis ? "#d4cfc6" : "#7c8177";
  return (
    <tr style={{ borderTop: emphasis ? "1px solid #1e2120" : undefined }}>
      <td style={{ padding: "6px 8px", color: emphasis ? "#4a9d5b" : "#d4cfc6" }}>{f.reason_type}</td>
      <td className="text-right" style={{ padding: "6px 8px", color }}>{f.impressions}</td>
      <td className="text-right" style={{ padding: "6px 8px", color }}>{pct(f.open_rate)}</td>
      <td className="text-right" style={{ padding: "6px 8px", color }}>{pct(f.save_rate)}</td>
      <td className="text-right" style={{ padding: "6px 8px", color }}>{f.started}</td>
      <td className="text-right" style={{ padding: "6px 8px", color }}>{f.finished}</td>
      <td className="text-right" style={{ padding: "6px 8px", color }}>{f.rated_4_plus}</td>
      <td className="text-right" style={{ padding: "6px 8px", color }}>{f.rated_5}</td>
      <td className="text-right" style={{ padding: "6px 8px", color }}>{f.diaried ?? 0}</td>
      <td className="text-right" style={{ padding: "6px 8px", color }}>{f.shared ?? 0}</td>
      <td className="text-right font-bold" style={{ padding: "6px 8px", color: "#4a9d5b" }}>{pct(f.love_rate)}</td>
    </tr>
  );
}

export default async function DiscoveryPage() {
  const d = await getDiscovery();
  const o = d?.overall;

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader title="Discovery quality" sub="Recommendation → finished book" />

      <div className="grid grid-cols-4 gap-3 mb-4">
        <KpiCard label="Impressions" value={o ? String(o.impressions) : "—"} sub={`last ${d?.window_days ?? 30}d`} />
        <KpiCard label="Open rate" value={o ? pct(o.open_rate) : "—"} sub="impression → book page" />
        <KpiCard label="Save rate" value={o ? pct(o.save_rate) : "—"} sub="impression → shelf" />
        <KpiCard label="Love rate" value={o ? pct(o.love_rate) : "—"} sub="impression → rated 4★+" accent />
      </div>

      <div className="rounded-lg p-5" style={{ background: "#131614", border: "1px solid #1e2120" }}>
        <SectionLabel label="north star" />
        <p className="font-display mt-1 mb-1" style={{ fontSize: 15, color: "#d4cfc6" }}>Funnel by recommendation reason</p>
        <p className="font-mono mb-4" style={{ fontSize: 10, color: "#3a3d38" }}>
          Love rate is the number that matters. A reason with fewer opens but more 4★+ finishes is the better
          reason — raw click-through cannot see that. Rows marked <code style={{ color: "#4a9d5b" }}>unknown</code>{" "}
          are impressions logged without a reason_type.
        </p>

        {d && d.by_reason.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full font-mono" style={{ fontSize: 11, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ color: "#505549" }}>
                  {["Reason", "Impr.", "Open", "Save", "Started", "Finished", "4★+", "5★", "Diary", "Shared", "Love rate"].map((h, i) => (
                    <th key={h} className={i === 0 ? "text-left font-normal uppercase tracking-widest" : "text-right font-normal uppercase tracking-widest"} style={{ fontSize: 9, padding: "4px 8px" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {d.by_reason.map((f) => <Row key={f.reason_type} f={f} />)}
                {o && <Row f={o} emphasis />}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="font-mono text-xs" style={{ color: "#3a3d38" }}>
            no recommendation impressions recorded yet
          </p>
        )}
      </div>
    </div>
  );
}
