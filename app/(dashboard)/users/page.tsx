import PageHeader from "@/components/page-header";
import StatCard from "@/components/stat-card";
import SimpleArea from "@/components/charts/area-chart";
import SectionLabel from "@/components/section-label";
import { getUsers } from "@/lib/analytics";

export const revalidate = 120;

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg p-5 ${className}`} style={{ background: "#131614", border: "1px solid #1e2120" }}>
      {children}
    </div>
  );
}

export default async function UsersPage() {
  const data = await getUsers();

  const totalReaders  = data?.recent_users.length ?? 0;
  const totalSignups  = data?.signups_by_day.reduce((s, d) => s + d.count, 0) ?? 0;
  const avgBooksAdded = data
    ? (data.recent_users.reduce((s, u) => s + u.books_added, 0) / Math.max(data.recent_users.length, 1)).toFixed(1)
    : "—";

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader title="Readers" sub="Signup trends and directory" />

      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatCard label="Recent readers" value={data ? totalReaders : "—"} sub="in last 30 days" />
        <StatCard label="Signups (30d)"  value={data ? totalSignups : "—"} deltaUp />
        <StatCard label="Avg books added" value={data ? avgBooksAdded : "—"} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Card>
          <SectionLabel label="acquisition" />
          <p className="font-display mt-1 mb-4" style={{ fontSize: 15, color: "#d4cfc6" }}>Signup trend — 30 days</p>
          {data ? <SimpleArea data={data.signups_by_day} color="#c4862d" height={180} label="signups" />
                : <div className="h-44 flex items-center justify-center font-mono text-xs" style={{color:"#3a3d38"}}>no data</div>}
        </Card>
        <Card>
          <SectionLabel label="activity" />
          <p className="font-display mt-1 mb-4" style={{ fontSize: 15, color: "#d4cfc6" }}>Daily active — 30 days</p>
          {data ? <SimpleArea data={data.active_by_day} height={180} label="active users" />
                : <div className="h-44 flex items-center justify-center font-mono text-xs" style={{color:"#3a3d38"}}>no data</div>}
        </Card>
      </div>

      {/* reader directory */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <SectionLabel label="directory" />
            <p className="font-display mt-1" style={{ fontSize: 15, color: "#d4cfc6" }}>Reader directory</p>
          </div>
          <span className="font-mono text-xs" style={{ color: "#505549" }}>
            {data ? `${data.recent_users.length} readers` : ""}
          </span>
        </div>
        {data ? (
          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #1e2120" }}>
                  {["#", "Username", "Joined", "Last active", "Books", "XP", "Streak", "Status"].map(h => (
                    <th key={h} className="text-left pb-2.5 pr-4 font-mono font-normal uppercase tracking-widest"
                      style={{ fontSize: 9, color: "#505549" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.recent_users.map((u, i) => {
                  const active = u.last_active === new Date().toISOString().slice(0, 10);
                  return (
                    <tr key={u.username} style={{ borderBottom: "1px solid #181b19" }}>
                      <td className="py-2.5 pr-4 font-mono" style={{ fontSize: 10, color: "#3a3d38" }}>{i + 1}</td>
                      <td className="py-2.5 pr-4 font-mono" style={{ fontSize: 11, color: "#d4cfc6" }}>{u.username}</td>
                      <td className="py-2.5 pr-4 font-mono" style={{ fontSize: 10, color: "#505549" }}>{u.joined_at.slice(0, 10)}</td>
                      <td className="py-2.5 pr-4 font-mono" style={{ fontSize: 10, color: "#505549" }}>{u.last_active ?? "—"}</td>
                      <td className="py-2.5 pr-4 font-mono" style={{ fontSize: 10, color: "#d4cfc6" }}>{u.books_added}</td>
                      <td className="py-2.5 pr-4 font-mono" style={{ fontSize: 10, color: "#4a9d5b" }}>{u.total_xp.toLocaleString()}</td>
                      <td className="py-2.5 pr-4 font-mono" style={{ fontSize: 10, color: u.current_streak > 0 ? "#c4862d" : "#505549" }}>
                        {u.current_streak > 0 ? `${u.current_streak}d` : "—"}
                      </td>
                      <td className="py-2.5">
                        <span className="font-mono px-2 py-0.5 rounded-sm" style={{
                          fontSize: 9,
                          background: active ? "rgba(74,157,91,0.12)" : "rgba(255,255,255,0.04)",
                          color: active ? "#4a9d5b" : "#505549",
                        }}>
                          {active ? "active" : "inactive"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="font-mono text-xs" style={{ color: "#3a3d38" }}>Cannot load reader directory.</p>
        )}
      </Card>
    </div>
  );
}
