export type OverviewData = {
  total_users: number; new_users_7d: number; dau: number;
  wau: number; mau: number; events_today: number; live_users_5m: number;
};
export type DayCount   = { date: string; count: number };
export type RecentUser = {
  username: string; joined_at: string; last_active: string | null;
  total_xp: number; current_streak: number; books_added: number;
};
export type UsersData  = { signups_by_day: DayCount[]; active_by_day: DayCount[]; recent_users: RecentUser[] };
export type FeatureUsage = { event_type: string; events: number; unique_users: number };
export type PowerUser    = { username: string; actions_30d: number; total_xp: number; current_streak: number };
export type FeaturesData = { feature_usage_30d: FeatureUsage[]; power_users: PowerUser[] };

async function api<T>(path: string): Promise<T> {
  const res = await fetch(`/api/analytics/${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`${path} ${res.status}`);
  return res.json();
}

export const fetchOverview  = () => api<OverviewData>("overview");
export const fetchUsers     = () => api<UsersData>("users");
export const fetchFeatures  = () => api<FeaturesData>("features");

// Server-side fetchers (used in page components directly)
export async function getOverview(): Promise<OverviewData | null> {
  try {
    const res = await fetch(
      `${process.env.PAPERBOXD_API_URL?.replace(/\/$/, "")}/api/v1/analytics/overview`,
      { headers: { "X-Internal-Secret": process.env.INTERNAL_SECRET ?? "" }, next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

export async function getUsers(): Promise<UsersData | null> {
  try {
    const res = await fetch(
      `${process.env.PAPERBOXD_API_URL?.replace(/\/$/, "")}/api/v1/analytics/users`,
      { headers: { "X-Internal-Secret": process.env.INTERNAL_SECRET ?? "" }, next: { revalidate: 120 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

export async function getFeatures(): Promise<FeaturesData | null> {
  try {
    const res = await fetch(
      `${process.env.PAPERBOXD_API_URL?.replace(/\/$/, "")}/api/v1/analytics/features`,
      { headers: { "X-Internal-Secret": process.env.INTERNAL_SECRET ?? "" }, next: { revalidate: 300 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}
