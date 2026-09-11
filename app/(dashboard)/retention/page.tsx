import PageHeader from "@/components/page-header";
import SimpleBar from "@/components/charts/bar-chart";
import SectionLabel from "@/components/section-label";
import { getUsers, getOverview, getRetention } from "@/lib/analytics";

export const revalidate = 300;

function KpiCard({ label, value, sub, accent = false }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className="rounded-lg p-4" style={{ background: accent ? "rgba(74,157,91,0.07)" : "#131614", border: `1px solid ${accent ? "rgba(74,157,91,0.25)" : "#1e2120"}` }}>
      <p className="font-mono uppercase tracking-widest mb-2" style={{ fontSize: 9, color: "#505549" }}>{label}</p>
      <p className="font-mono font-bold" style={{ fontSize: 26, color: accent ? "#4a9d5b" : "#d4cfc6", lineHeight: 1, letterSpacing: "-0.02em" }}>{value}</p>
      {sub && <p className="font-mono mt-1.5" style={{ fontSize: 10, color: "#3a3d38" }}>{sub}</p>}
    </div>
  );
}

const pct = (v: number | undefined) => (v == null ? "—" : `${(v * 100).toFixed(0)}%`);

/** Heat shading for a retention cell. Null cohorts read as empty, not as 0%. */
function cell(rate: number, size: number) {
  if (size === 0) return { background: "transparent", color: "#3a3d38" };
  const a = Math.min(rate, 1) * 0.45;
  return { background: `rgba(74,157,91,${a.toFixed(3)})`, color: rate > 0.25 ? "#d4cfc6" : "#7c8177" };
}

export default async function RetentionPage() {
  const [users, overview, retention] = await Promise.all([getUsers(), getOverview(), getRetention()]);

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader title="Retention & growth" sub="Week-over-week · cohort analysis" />

      <div className="grid grid-cols-3 gap-3 mb-4">
        {/* MAU comes from the backend's own distinct-user count. Summing
            active_by_day over 30 days counted one reader up to 30 times, which
            is why this card used to disagree with the overview page. */}
        <KpiCard label="MAU" value={overview ? String(overview.mau) : "—"} sub="distinct active, 30d" />
        <KpiCard label="D1 retention" value={pct(retention?.d1_rate)} sub="all cohorts" accent />
        <KpiCard label="D30 retention" value={pct(retention?.d30_rate)} sub="all cohorts" />
        <KpiCard label="Activation rate" value={pct(retention?.activation_rate)} sub="shelved a book within 7d" />
        <KpiCard label="DAU / MAU" value={pct(retention?.stickiness)} sub="stickiness ratio" />
        <KpiCard label="Dormant users" value={retention ? String(retention.dormant_users) : "—"} sub="no activity in 30d" />
      </div>

      <div className="rounded-lg p-5 mb-4" style={{ background: "#131614", border: "1px solid #1e2120" }}>
        <SectionLabel label="activity" />
        <p className="font-display mt-1 mb-4" style={{ fontSize: 15, color: "#d4cfc6" }}>Week-over-week active readers</p>
        {users ? (
          <SimpleBar data={users.active_by_day.slice(-12)} height={180} label="active" />
        ) : (
          <div className="h-44 flex items-center justify-center font-mono text-xs" style={{ color: "#3a3d38" }}>no data</div>
        )}
      </div>

      <div className="rounded-lg p-5" style={{ background: "#131614", border: "1px solid #1e2120" }}>
        <SectionLabel label="cohort analysis" />
        <p className="font-display mt-1 mb-1" style={{ fontSize: 15, color: "#d4cfc6" }}>Cohort retention by signup week</p>
        <p className="font-mono mb-4" style={{ fontSize: 10, color: "#3a3d38" }}>
          Day-N is classic: active <em>on</em> that day, not on or after it. Activity is any tracked event.
        </p>

        {retention && retention.cohorts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full font-mono" style={{ fontSize: 11, borderCollapse: "separate", borderSpacing: 2 }}>
              <thead>
                <tr style={{ color: "#505549" }}>
                  <th className="text-left font-normal uppercase tracking-widest" style={{ fontSize: 9, padding: "4px 8px" }}>Cohort</th>
                  <th className="text-right font-normal uppercase tracking-widest" style={{ fontSize: 9, padding: "4px 8px" }}>Size</th>
                  {["D1", "D7", "D14", "D30"].map((d) => (
                    <th key={d} className="text-right font-normal uppercase tracking-widest" style={{ fontSize: 9, padding: "4px 8px" }}>{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {retention.cohorts.map((c) => (
                  <tr key={c.cohort_week}>
                    <td style={{ padding: "6px 8px", color: "#7c8177" }}>{c.cohort_week}</td>
                    <td className="text-right" style={{ padding: "6px 8px", color: "#d4cfc6" }}>{c.size}</td>
                    {[c.d1_rate, c.d7_rate, c.d14_rate, c.d30_rate].map((r, i) => (
                      <td key={i} className="text-right rounded" style={{ padding: "6px 8px", ...cell(r, c.size) }}>
                        {c.size === 0 ? "—" : pct(r)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="font-mono text-xs" style={{ color: "#3a3d38" }}>no cohorts in window</p>
        )}
      </div>
    </div>
  );
}
