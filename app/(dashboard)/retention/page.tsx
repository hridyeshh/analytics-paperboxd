export default function RetentionPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="font-display text-3xl text-ink">Retention</h1>
        <p className="text-muted font-mono text-xs mt-1">Cohort analysis · coming soon</p>
      </header>
      <div className="bg-surface border border-border rounded-lg p-12 flex items-center justify-center">
        <p className="text-muted font-mono text-sm">
          Retention cohort endpoints not yet implemented in the backend.
          <br />Add <code className="text-green">/api/v1/analytics/retention</code> to unlock.
        </p>
      </div>
    </div>
  );
}
