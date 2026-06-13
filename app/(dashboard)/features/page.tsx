import PageHeader from "@/components/page-header";
import LeaderboardChart from "@/components/charts/leaderboard-chart";
import SectionLabel from "@/components/section-label";
import { getFeatures } from "@/lib/analytics";

export const revalidate = 300;

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg p-5 ${className}`} style={{ background: "#131614", border: "1px solid #1e2120" }}>
      {children}
    </div>
  );
}

export default async function FeaturesPage() {
  const data = await getFeatures();
  const sorted = data ? [...data.feature_usage_30d].sort((a, b) => b.events - a.events) : [];
  const maxEvents = sorted[0]?.events ?? 1;

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader title="Features" sub="Event breakdown · last 30 days" />

      {/* leaderboard */}
      <Card className="mb-4">
        <div className="flex items-center justify-between mb-5">
          <div>
            <SectionLabel label="adoption" />
            <p className="font-display mt-1" style={{ fontSize: 15, color: "#d4cfc6" }}>Feature adoption leaderboard</p>
          </div>
          <div className="flex gap-1">
            {["Events", "Unique", "Per reader"].map(t => (
              <span key={t} className="font-mono px-2.5 py-1 rounded text-xs first:bg-green first:bg-opacity-20 first:text-green"
                style={{ fontSize: 10, color: "#505549", border: "1px solid #1e2120" }}>
                {t.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
        {data ? (
          <LeaderboardChart
            rows={sorted.map(f => ({ name: f.event_type, value: f.events, max: maxEvents }))}
          />
        ) : (
          <p className="font-mono text-xs" style={{ color: "#3a3d38" }}>no data</p>
        )}
      </Card>

      <div className="grid grid-cols-2 gap-4">
        {/* all events table */}
        <Card>
          <SectionLabel label="breakdown" />
          <p className="font-display mt-1 mb-4" style={{ fontSize: 15, color: "#d4cfc6" }}>All event types</p>
          {data ? (
            <table className="w-full" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #1e2120" }}>
                  {["Event", "Events", "Users", "E/U"].map(h => (
                    <th key={h} className="text-left pb-2 pr-3 font-mono font-normal uppercase tracking-widest"
                      style={{ fontSize: 9, color: "#505549" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.map(f => (
                  <tr key={f.event_type} style={{ borderBottom: "1px solid #181b19" }}>
                    <td className="py-2 pr-3 font-mono" style={{ fontSize: 10, color: "#d4cfc6" }}>
                      {f.event_type.replace(/\./g, " › ")}
                    </td>
                    <td className="py-2 pr-3 font-mono" style={{ fontSize: 10, color: "#4a9d5b" }}>{f.events}</td>
                    <td className="py-2 pr-3 font-mono" style={{ fontSize: 10, color: "#c4862d" }}>{f.unique_users}</td>
                    <td className="py-2 font-mono" style={{ fontSize: 10, color: "#505549" }}>
                      {f.unique_users > 0 ? (f.events / f.unique_users).toFixed(1) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="font-mono text-xs" style={{ color: "#3a3d38" }}>no data</p>
          )}
        </Card>

        {/* power users */}
        <Card>
          <SectionLabel label="power readers" />
          <p className="font-display mt-1 mb-4" style={{ fontSize: 15, color: "#d4cfc6" }}>Top readers by actions</p>
          {data ? (
            <table className="w-full" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #1e2120" }}>
                  {["#", "Username", "Actions", "XP", "Streak"].map(h => (
                    <th key={h} className="text-left pb-2 pr-3 font-mono font-normal uppercase tracking-widest"
                      style={{ fontSize: 9, color: "#505549" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.power_users.slice(0, 15).map((u, i) => (
                  <tr key={u.username} style={{ borderBottom: "1px solid #181b19" }}>
                    <td className="py-2 pr-3 font-mono" style={{ fontSize: 10, color: "#3a3d38" }}>{i + 1}</td>
                    <td className="py-2 pr-3 font-mono" style={{ fontSize: 10, color: "#d4cfc6" }}>{u.username}</td>
                    <td className="py-2 pr-3 font-mono" style={{ fontSize: 10, color: "#4a9d5b" }}>{u.actions_30d}</td>
                    <td className="py-2 pr-3 font-mono" style={{ fontSize: 10, color: "#c4862d" }}>{u.total_xp.toLocaleString()}</td>
                    <td className="py-2 font-mono" style={{ fontSize: 10, color: u.current_streak > 0 ? "#c4862d" : "#505549" }}>
                      {u.current_streak > 0 ? `${u.current_streak}d` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="font-mono text-xs" style={{ color: "#3a3d38" }}>no data</p>
          )}
        </Card>
      </div>
    </div>
  );
}
