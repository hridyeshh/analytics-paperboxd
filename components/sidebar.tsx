"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/overview",  label: "Overview",        icon: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  )},
  { href: "/users",     label: "Readers",          icon: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M2 12c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )},
  { href: "/features",  label: "Features",         icon: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 10h2M2 7h5M2 4h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <rect x="6" y="8.5" width="6" height="3" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  )},
  { href: "/retention", label: "Retention",        icon: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 10 L5 7 L8 9 L12 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
  { href: "/infra",     label: "Infrastructure",   icon: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="2" width="12" height="3" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="1" y="7" width="12" height="3" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="3.5" cy="3.5" r="0.8" fill="currentColor"/>
      <circle cx="3.5" cy="8.5" r="0.8" fill="currentColor"/>
    </svg>
  )},
];

export default function Sidebar() {
  const path = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  async function logout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/login");
  }

  return (
    <aside
      className="flex flex-col shrink-0 relative z-10 transition-all duration-200"
      style={{
        width: collapsed ? 52 : 192,
        background: "#0f1210",
        borderRight: "1px solid #1a1d1b",
      }}
    >
      {/* logo */}
      <div className="flex items-center gap-2.5 px-4 py-5">
        <div className="w-6 h-6 rounded flex items-center justify-center shrink-0" style={{background:"#1e2820"}}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 1h5l3 3v7H2V1z" stroke="#4a9d5b" strokeWidth="1.2" strokeLinejoin="round"/>
            <path d="M7 1v3h3" stroke="#4a9d5b" strokeWidth="1.2" strokeLinejoin="round"/>
          </svg>
        </div>
        {!collapsed && (
          <span style={{fontFamily:'"Playfair Display",serif', fontSize:14, color:"#d4cfc6", fontWeight:600}}>
            PaperBoxd
          </span>
        )}
      </div>

      {/* label */}
      {!collapsed && (
        <div className="px-4 pb-3">
          <span style={{fontSize:9, fontFamily:'"Geist Mono",monospace', color:"#3a3d38", letterSpacing:"0.12em", textTransform:"uppercase"}}>
            Analytics
          </span>
        </div>
      )}

      {/* nav */}
      <nav className="flex-1 px-2 space-y-0.5">
        {nav.map(({ href, label, icon }) => {
          const active = path === href || path.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-mono transition-all"
              style={{
                color: active ? "#4a9d5b" : "#505549",
                background: active ? "rgba(74,157,91,0.08)" : "transparent",
              }}
            >
              <span className="shrink-0">{icon}</span>
              {!collapsed && label}
            </Link>
          );
        })}
      </nav>

      <div className="px-2 pb-4 space-y-0.5">
        <button
          onClick={() => setCollapsed(c => !c)}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-mono transition-colors"
          style={{ color: "#3a3d38" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d={collapsed ? "M4 2l5 5-5 5" : "M10 2L5 7l5 5"} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {!collapsed && "Collapse"}
        </button>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-mono transition-colors hover:text-rose-400"
          style={{ color: "#3a3d38" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 10l3-3-3-3M12 7H5M5 2H2v10h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}
