export type OverviewData = {
  total_users: number;
  new_users_7d: number;
  dau: number;
  wau: number;
  mau: number;
  events_today: number;
  live_users_5m: number;
};

export type DayCount = { date: string; count: number };

export type RecentUser = {
  username: string;
  joined_at: string;
  last_active: string | null;
  total_xp: number;
  current_streak: number;
  books_added: number;
};

export type UsersData = {
  signups_by_day: DayCount[];
  active_by_day: DayCount[];
  recent_users: RecentUser[];
};

export type FeatureUsage = { event_type: string; events: number; unique_users: number };
export type PowerUser   = { username: string; actions_30d: number; total_xp: number; current_streak: number };

export type FeaturesData = {
  feature_usage_30d: FeatureUsage[];
  power_users: PowerUser[];
};

async function api<T>(path: string): Promise<T> {
  const res = await fetch(`/api/analytics/${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`analytics/${path} failed: ${res.status}`);
  return res.json();
}

export const fetchOverview  = () => api<OverviewData>("overview");
export const fetchUsers     = () => api<UsersData>("users");
export const fetchFeatures  = () => api<FeaturesData>("features");
