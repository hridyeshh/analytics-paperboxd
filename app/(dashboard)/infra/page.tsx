import PageHeader from "@/components/page-header";
import SectionLabel from "@/components/section-label";

function InfraCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg p-5 ${className}`} style={{ background: "#131614", border: "1px solid #1e2120" }}>
      {children}
    </div>
  );
}

function StatRow({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="flex items-center justify-between py-2.5" style={{ borderBottom: "1px solid #181b19" }}>
      <span className="font-mono uppercase tracking-widest" style={{ fontSize: 9, color: "#505549" }}>{label}</span>
      <span className="font-mono font-medium" style={{ fontSize: 12, color: accent ?? "#d4cfc6" }}>{value}</span>
    </div>
  );
}

export default function InfraPage() {
  const apiUrl = (process.env.PAPERBOXD_API_URL ?? "—").replace(/\/$/, "");

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader title="Infrastructure" sub="Railway · Vercel · Supabase" />

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* PostgreSQL */}
        <InfraCard>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-green animate-pulse" />
            <SectionLabel label="PostgreSQL" color="#4a9d5b" />
          </div>
          <StatRow label="Provider"     value="Supabase" />
          <StatRow label="API backend"  value={apiUrl.length > 40 ? apiUrl.slice(0, 40) + "…" : apiUrl} />
          <StatRow label="Status"       value="connected" accent="#4a9d5b" />
          <StatRow label="Replication"  value="not configured" />
        </InfraCard>

        {/* Redis */}
        <InfraCard>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-amber animate-pulse" />
            <SectionLabel label="Redis / Cache" color="#c4862d" />
          </div>
          <StatRow label="Provider"     value="Railway Redis" />
          <StatRow label="Cache keys"   value="analytics:overview · analytics:users · analytics:features" />
          <StatRow label="TTL overview" value="5 min" />
          <StatRow label="TTL features" value="10 min" />
        </InfraCard>
      </div>

      {/* Deployments */}
      <div className="grid grid-cols-2 gap-4">
        <InfraCard>
          <SectionLabel label="backend" />
          <p className="font-display mt-1 mb-4" style={{ fontSize: 15, color: "#d4cfc6" }}>Railway</p>
          <StatRow label="Service" value="paperboxd-backend" />
          <StatRow label="Runtime" value="Go 1.24" />
          <StatRow label="Branch"  value="main" />
          <div className="mt-4">
            <a href="https://railway.app" target="_blank" rel="noreferrer"
              className="font-mono text-xs hover:underline" style={{ color: "#4a9d5b" }}>
              Open Railway dashboard →
            </a>
          </div>
        </InfraCard>
        <InfraCard>
          <SectionLabel label="frontend" />
          <p className="font-display mt-1 mb-4" style={{ fontSize: 15, color: "#d4cfc6" }}>Vercel</p>
          <StatRow label="App"      value="paperboxd (main)" />
          <StatRow label="Analytics" value="analytics-paperboxd (main)" />
          <StatRow label="Domain"   value="analytics.paperboxd.in" />
          <div className="mt-4">
            <a href="https://vercel.com" target="_blank" rel="noreferrer"
              className="font-mono text-xs hover:underline" style={{ color: "#4a9d5b" }}>
              Open Vercel dashboard →
            </a>
          </div>
        </InfraCard>
      </div>
    </div>
  );
}
