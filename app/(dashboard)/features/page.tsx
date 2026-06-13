import FeatureBarChart from "@/components/charts/bar-chart";
import { fetchFeatures } from "@/lib/analytics";

export const revalidate = 300;

export default async function FeaturesPage() {
  const data = await fetchFeatures().catch(() => null);
  if (!data) return <p className="text-rose font-mono text-sm">Failed to load features data.</p>;

  const chartData = data.feature_usage_30d.map(f => ({
    name: f.event_type,
    events: f.events,
    unique_users: f.unique_users,
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="font-display text-3xl text-ink">Features</h1>
        <p className="text-muted font-mono text-xs mt-1">Event breakdown — last 30 days</p>
      </header>

      {/* bar chart */}
      <section className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center gap-6 mb-4">
          <h2 className="font-display text-lg text-ink">Feature Usage</h2>
          <div className="flex items-center gap-4 text-xs font-mono text-muted">
            <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-sm bg-green" />events</span>
            <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-sm bg-amber" />unique users</span>
          </div>
        </div>
        <FeatureBarChart data={chartData} />
      </section>

      {/* event type table */}
      <section className="bg-surface border border-border rounded-lg p-6">
        <h2 className="font-display text-lg text-ink mb-4">All Events</h2>
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="text-muted border-b border-border">
              {["Event type","Events","Unique users","Events / user"].map(h => (
                <th key={h} className="text-left pb-2 pr-6 font-normal tracking-wide uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.feature_usage_30d.map(f => (
              <tr key={f.event_type} className="border-b border-border/50 hover:bg-bg/40 transition-colors">
                <td className="py-2.5 pr-6 text-ink">{f.event_type}</td>
                <td className="py-2.5 pr-6 text-green">{f.events.toLocaleString()}</td>
                <td className="py-2.5 pr-6 text-amber">{f.unique_users.toLocaleString()}</td>
                <td className="py-2.5 text-muted">
                  {f.unique_users > 0 ? (f.events / f.unique_users).toFixed(1) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* power users */}
      <section className="bg-surface border border-border rounded-lg p-6">
        <h2 className="font-display text-lg text-ink mb-4">Power Readers</h2>
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="text-muted border-b border-border">
              {["#","Username","Actions (30d)","Total XP","Streak"].map(h => (
                <th key={h} className="text-left pb-2 pr-6 font-normal tracking-wide uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.power_users.slice(0, 20).map((u, i) => (
              <tr key={u.username} className="border-b border-border/50 hover:bg-bg/40 transition-colors">
                <td className="py-2.5 pr-6 text-muted">{i + 1}</td>
                <td className="py-2.5 pr-6 text-ink">{u.username}</td>
                <td className="py-2.5 pr-6 text-green">{u.actions_30d.toLocaleString()}</td>
                <td className="py-2.5 pr-6 text-amber">{u.total_xp.toLocaleString()}</td>
                <td className="py-2.5 text-muted">{u.current_streak}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
