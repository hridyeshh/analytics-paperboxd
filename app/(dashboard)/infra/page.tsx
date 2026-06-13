export default function InfraPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="font-display text-3xl text-ink">Infrastructure</h1>
        <p className="text-muted font-mono text-xs mt-1">Railway · Vercel · Supabase</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "API (Railway)",  url: process.env.PAPERBOXD_API_URL ?? "—", status: "up" },
          { label: "Frontend",       url: "paperboxd.in",                         status: "up" },
          { label: "Analytics",      url: "analytics.paperboxd.in",               status: "up" },
        ].map(s => (
          <div key={s.label} className="bg-surface border border-border rounded-lg p-5">
            <p className="text-muted font-mono text-xs uppercase tracking-widest mb-2">{s.label}</p>
            <p className="font-mono text-xs text-ink break-all mb-3">{s.url}</p>
            <span className="inline-flex items-center gap-1.5 text-green font-mono text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />{s.status}
            </span>
          </div>
        ))}
      </div>
      <section className="bg-surface border border-border rounded-lg p-6">
        <h2 className="font-display text-lg text-ink mb-4">Quick Links</h2>
        <ul className="space-y-2 font-mono text-xs">
          {[
            ["Railway Dashboard",   "https://railway.app"],
            ["Vercel Dashboard",    "https://vercel.com"],
            ["Supabase Dashboard",  "https://supabase.com"],
          ].map(([label, href]) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer"
                className="text-green hover:underline">{label}</a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
