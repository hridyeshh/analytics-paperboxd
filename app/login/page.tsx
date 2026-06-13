"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    if (res.ok) router.push("/overview");
    else setError("Wrong password");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-80">
        <h1 className="font-display text-2xl text-ink mb-1">PaperBoxd</h1>
        <p className="text-muted text-sm mb-8">Analytics · Internal</p>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full bg-surface border border-border rounded px-4 py-2.5 text-ink placeholder:text-muted focus:outline-none focus:border-green font-mono text-sm"
          />
          {error && <p className="text-rose text-xs font-mono">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green text-bg font-mono text-sm py-2.5 rounded hover:opacity-90 transition-opacity"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
