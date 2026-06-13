"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/overview",  label: "Overview",       icon: "◈" },
  { href: "/users",     label: "Readers",         icon: "◎" },
  { href: "/features",  label: "Features",        icon: "◆" },
  { href: "/retention", label: "Retention",       icon: "◉" },
  { href: "/infra",     label: "Infrastructure",  icon: "◫" },
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
      className="flex flex-col border-r border-border bg-surface transition-all duration-200 shrink-0 relative z-10"
      style={{ width: collapsed ? 56 : 200 }}
    >
      {/* logo */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-border">
        <span className="text-green font-mono text-lg leading-none">⬡</span>
        {!collapsed && <span className="font-display text-ink text-sm font-semibold tracking-wide">PaperBoxd</span>}
      </div>

      {/* nav */}
      <nav className="flex-1 py-3">
        {nav.map(({ href, label, icon }) => {
          const active = path === href || path.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm font-mono transition-colors
                ${active ? "text-green bg-green/10" : "text-muted hover:text-ink"}`}
            >
              <span className="text-base leading-none shrink-0">{icon}</span>
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* collapse toggle */}
      <button
        onClick={() => setCollapsed(c => !c)}
        className="mx-4 mb-3 text-muted hover:text-ink font-mono text-xs transition-colors text-left"
      >
        {collapsed ? "›" : "‹ collapse"}
      </button>

      {/* logout */}
      <button
        onClick={logout}
        className="mx-4 mb-4 text-muted hover:text-rose font-mono text-xs transition-colors text-left"
      >
        {collapsed ? "⏻" : "⏻ logout"}
      </button>
    </aside>
  );
}
