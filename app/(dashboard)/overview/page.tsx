import StatCard from "@/components/stat-card";
import SimpleArea from "@/components/charts/area-chart";
import { fetchOverview, fetchUsers } from "@/lib/analytics";

export const revalidate = 60;

export default async function OverviewPage() {
  const [ov, users] = await Promise.all([fetchOverview(), fetchUsers()]).catch(() => [null, null]);

  if (!ov) return <ErrorState />;

  const dauPct  = ov.mau > 0 ? ((ov.dau / ov.mau) * 100).toFixed(1) : "—";
  const wauPct  = ov.mau > 0 ? ((ov.wau / ov.mau) * 100).toFixed(1) : "—";

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="font-display text-3xl text-ink">Overview</h1>
        <p className="text-muted font-mono text-xs mt-1">Live snapshot · refreshes every 60 s</p>
      </header>

      {/* stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="DAU"        value={ov.dau}          sub={`${dauPct}% of MAU`} accent="green" />
        <StatCard label="WAU"        value={ov.wau}          sub={`${wauPct}% of MAU`} />
        <StatCard label="MAU"        value={ov.mau}          />
        <StatCard label="Live now"   value={ov.live_users_5m} sub="last 5 min"          accent="green" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard label="Total users"  value={ov.total_users}   />
        <StatCard label="New (7 d)"    value={ov.new_users_7d}  accent="amber" />
        <StatCard label="Events today" value={ov.events_today}  />
      </div>

      {/* DAU chart */}
      {users && (
        <section className="bg-surface border border-border rounded-lg p-6">
          <h2 className="font-display text-lg text-ink mb-4">Daily Active Users — 30 days</h2>
          <SimpleArea data={users.active_by_day} label="active users" />
        </section>
      )}

      {/* Signup trend */}
      {users && (
        <section className="bg-surface border border-border rounded-lg p-6">
          <h2 className="font-display text-lg text-ink mb-4">Signups — 30 days</h2>
          <SimpleArea data={users.signups_by_day} color="#c4862d" label="signups" />
        </section>
      )}
    </div>
  );
}

function ErrorState() {
  return (
    <div className="flex items-center justify-center h-64">
      <p className="text-rose font-mono text-sm">Failed to load analytics. Check PAPERBOXD_API_URL and INTERNAL_SECRET.</p>
    </div>
  );
}
