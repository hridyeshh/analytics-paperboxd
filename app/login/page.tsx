"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    setLoading(false);
    if (res.ok) router.push("/overview");
    else { setError("Wrong password"); setPw(""); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10">
      <div style={{ width: 320 }}>
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: "#1e2820" }}>
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
              <path d="M2 1h5l3 3v7H2V1z" stroke="#4a9d5b" strokeWidth="1.2" strokeLinejoin="round"/>
              <path d="M7 1v3h3" stroke="#4a9d5b" strokeWidth="1.2" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontFamily: '"Playfair Display",serif', fontSize: 16, color: "#d4cfc6", fontWeight: 600 }}>
            PaperBoxd Analytics
          </span>
        </div>

        <p className="font-mono mb-6" style={{ fontSize: 10, color: "#3a3d38", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Internal · analytics.paperboxd.in
        </p>

        <form onSubmit={submit} className="space-y-3">
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full font-mono text-sm px-4 py-2.5 rounded-lg outline-none transition-all"
            style={{
              background: "#131614",
              border: "1px solid #1e2120",
              color: "#d4cfc6",
            }}
          />
          {error && (
            <p className="font-mono text-xs" style={{ color: "#c45a4d" }}>{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full font-mono text-sm py-2.5 rounded-lg transition-opacity"
            style={{ background: "#4a9d5b", color: "#0b0d0c", opacity: loading ? 0.6 : 1 }}
          >
            {loading ? "…" : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
