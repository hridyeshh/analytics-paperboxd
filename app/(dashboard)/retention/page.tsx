import PageHeader from "@/components/page-header";
import SimpleBar from "@/components/charts/bar-chart";
import SectionLabel from "@/components/section-label";
import { getUsers } from "@/lib/analytics";

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

export default async function RetentionPage() {
  const users = await getUsers();

  const wauData = users?.active_by_day.slice(-8).map((d, i, arr) => {
    const prev = arr[i - 1]?.count ?? d.count;
    const pct = prev > 0 ? (((d.count - prev) / prev) * 100).toFixed(0) : "0";
    return { ...d, pct };
  }) ?? [];

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader title="Retention & growth" sub="Week-over-week · cohort analysis" />

      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <KpiCard label="MAU"            value={users ? String(users.active_by_day.slice(-30).reduce((s,d)=>s+d.count,0)) : "—"} sub="monthly active" />
        <KpiCard label="D1 Retention"   value="—" sub="needs cohort endpoint" accent />
        <KpiCard label="D30 Retention"  value="—" sub="needs cohort endpoint" />
        <KpiCard label="Activation rate" value="—" sub="needs cohort endpoint" />
        <KpiCard label="WAU / MAU"      value="—" sub="stickiness ratio" />
        <KpiCard label="Median dormant" value="—" sub="days since last active" />
      </div>

      {/* WoW bar */}
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
        <p className="font-display mt-1 mb-4" style={{ fontSize: 15, color: "#d4cfc6" }}>Cohort retention</p>
        <p className="font-mono text-xs" style={{ color: "#3a3d38" }}>
          Add <code style={{ color: "#4a9d5b" }}>/api/v1/analytics/retention</code> to the Go backend to unlock cohort heatmap.
        </p>
      </div>
    </div>
  );
}
