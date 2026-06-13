import SimpleArea from "@/components/charts/area-chart";
import { fetchUsers } from "@/lib/analytics";

export const revalidate = 120;

export default async function UsersPage() {
  const data = await fetchUsers().catch(() => null);
  if (!data) return <p className="text-rose font-mono text-sm">Failed to load users data.</p>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="font-display text-3xl text-ink">Readers</h1>
        <p className="text-muted font-mono text-xs mt-1">Signup and activity trends</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-surface border border-border rounded-lg p-6">
          <h2 className="font-display text-lg text-ink mb-4">Signups — 30 days</h2>
          <SimpleArea data={data.signups_by_day} color="#c4862d" label="signups" />
        </section>
        <section className="bg-surface border border-border rounded-lg p-6">
          <h2 className="font-display text-lg text-ink mb-4">Active — 30 days</h2>
          <SimpleArea data={data.active_by_day} label="active" />
        </section>
      </div>

      {/* Recent users table */}
      <section className="bg-surface border border-border rounded-lg p-6">
        <h2 className="font-display text-lg text-ink mb-4">Recent Readers</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="text-muted border-b border-border">
                {["Username","Joined","Last active","XP","Streak","Books"].map(h => (
                  <th key={h} className="text-left pb-2 pr-6 font-normal tracking-wide uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.recent_users.map(u => (
                <tr key={u.username} className="border-b border-border/50 hover:bg-bg/40 transition-colors">
                  <td className="py-2.5 pr-6 text-ink">{u.username}</td>
                  <td className="py-2.5 pr-6 text-muted">{u.joined_at.slice(0, 10)}</td>
                  <td className="py-2.5 pr-6 text-muted">{u.last_active ?? "—"}</td>
                  <td className="py-2.5 pr-6 text-green">{u.total_xp.toLocaleString()}</td>
                  <td className="py-2.5 pr-6 text-amber">{u.current_streak}</td>
                  <td className="py-2.5 text-ink">{u.books_added}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
