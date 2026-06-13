import Sidebar from "@/components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden relative z-10">
      <Sidebar />
      <main className="flex-1 overflow-y-auto" style={{ padding: "2rem 2.5rem" }}>
        {children}
      </main>
    </div>
  );
}
