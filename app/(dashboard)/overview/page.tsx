import PageHeader from "@/components/page-header";
import StatCard from "@/components/stat-card";
import SimpleArea from "@/components/charts/area-chart";
import SectionLabel from "@/components/section-label";
import { getOverview, getUsers } from "@/lib/analytics";

export const revalidate = 60;

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg p-5 ${className}`} style={{ background: "#131614", border: "1px solid #1e2120" }}>
      {children}
    </div>
  );
}

export default async function OverviewPage() {
  const [ov, users] = await Promise.all([getOverview(), getUsers()]);

  const dauPct  = ov && ov.mau > 0 ? ((ov.dau / ov.mau) * 100).toFixed(1) : "—";
  const wauPct  = ov && ov.mau > 0 ? ((ov.wau / ov.mau) * 100).toFixed(1) : "—";

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader title="Overview" sub="Real-time · paperboxd.in" />

      {!ov && (
        <div className="mb-6 px-4 py-3 rounded font-mono text-xs" style={{ background: "#1a1208", border: "1px solid #3a2a10", color: "#c4862d" }}>
          ⚠ Cannot reach backend — check PAPERBOXD_API_URL and INTERNAL_SECRET in .env.local
        </div>
      )}

      {/* stat row */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        <StatCard label="Total readers" value={ov?.total_users ?? "—"} />
        <StatCard label="New (7d)"      value={ov?.new_users_7d ?? "—"} delta={ov ? `${ov.new_users_7d} this week` : undefined} deltaUp />
        <StatCard label="MAU"           value={ov?.mau ?? "—"} sub={wauPct !== "—" ? `WAU ${wauPct}% of MAU` : undefined} />
        <StatCard label="DAU"           value={ov?.dau ?? "—"} sub={dauPct !== "—" ? `${dauPct}% of MAU` : undefined} delta={dauPct !== "—" ? `${dauPct}%` : undefined} deltaUp />
        <StatCard label="Live now"      value={ov?.live_users_5m ?? "—"} sub="last 5 min" live />
      </div>

      {/* charts row */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card className="col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <SectionLabel label="readers" />
              <p className="font-display mt-1" style={{ fontSize: 15, color: "#d4cfc6" }}>Daily active readers</p>
            </div>
          </div>
          {users ? (
            <SimpleArea data={users.active_by_day} height={200} label="active readers" />
          ) : (
            <div className="h-48 flex items-center justify-center">
              <span className="font-mono text-xs" style={{ color: "#3a3d38" }}>no data</span>
            </div>
          )}
        </Card>
        <Card>
          <SectionLabel label="acquisition" />
          <p className="font-display mt-1 mb-4" style={{ fontSize: 15, color: "#d4cfc6" }}>Signup trend</p>
          {users ? (
            <SimpleArea data={users.signups_by_day} color="#c4862d" height={200} label="signups" />
          ) : (
            <div className="h-48 flex items-center justify-center">
              <span className="font-mono text-xs" style={{ color: "#3a3d38" }}>no data</span>
            </div>
          )}
        </Card>
      </div>

      {/* bottom row */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <SectionLabel label="events" />
          <p className="font-display mt-1 mb-3" style={{ fontSize: 15, color: "#d4cfc6" }}>Today</p>
          <p className="font-mono font-bold" style={{ fontSize: 36, color: "#4a9d5b", lineHeight: 1 }}>
            {ov ? ov.events_today.toLocaleString() : "—"}
          </p>
          <p className="font-mono mt-2" style={{ fontSize: 10, color: "#505549" }}>events recorded today</p>
        </Card>
        <Card className="col-span-2">
          <SectionLabel label="recent activity" />
          <p className="font-display mt-1 mb-4" style={{ fontSize: 15, color: "#d4cfc6" }}>Recent readers</p>
          {users ? (
            <div className="space-y-2">
              {users.recent_users.slice(0, 6).map(u => (
                <div key={u.username} className="flex items-center justify-between py-1.5 border-b" style={{ borderColor: "#1e2120" }}>
                  <span className="font-mono text-xs" style={{ color: "#d4cfc6" }}>{u.username}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs" style={{ color: "#4a9d5b" }}>{u.total_xp.toLocaleString()} xp</span>
                    <span className="font-mono text-xs" style={{ color: "#505549" }}>{u.last_active ?? "never"}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-mono text-xs" style={{ color: "#3a3d38" }}>no data</p>
          )}
        </Card>
      </div>
    </div>
  );
}
