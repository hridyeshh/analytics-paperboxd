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

export type RetentionCohort = {
  cohort_week: string; size: number;
  d1: number; d7: number; d14: number; d30: number;
  d1_rate: number; d7_rate: number; d14_rate: number; d30_rate: number;
};
export type RetentionData = {
  window_days: number;
  cohorts: RetentionCohort[];
  d1_rate: number; d7_rate: number; d30_rate: number;
  activation_rate: number; stickiness: number; dormant_users: number;
};

export type DiscoveryFunnel = {
  reason_type: string;
  impressions: number; opens: number; saved: number;
  started: number; finished: number;
  rated: number; rated_4_plus: number; rated_5: number;
  diaried?: number; shared?: number;
  open_rate: number; save_rate: number; finish_rate: number; love_rate: number;
};
export type DiscoveryData = {
  window_days: number;
  by_reason: DiscoveryFunnel[];
  overall: DiscoveryFunnel;
};

async function api<T>(path: string): Promise<T> {
  const res = await fetch(`/api/analytics/${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`${path} ${res.status}`);
  return res.json();
}

export const fetchOverview  = () => api<OverviewData>("overview");
export const fetchUsers     = () => api<UsersData>("users");
export const fetchFeatures  = () => api<FeaturesData>("features");
export const fetchRetention = () => api<RetentionData>("retention");
export const fetchDiscovery = () => api<DiscoveryData>("discovery");

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

export async function getRetention(): Promise<RetentionData | null> {
  return getJSON<RetentionData>("retention", 300);
}

export async function getDiscovery(): Promise<DiscoveryData | null> {
  return getJSON<DiscoveryData>("discovery", 300);
}

/**
 * Shared server-side fetch for the internal-secret-gated analytics endpoints.
 * Returns null rather than throwing: a dashboard panel that cannot load should
 * render "no data", never take the whole page down.
 */
async function getJSON<T>(path: string, revalidate: number): Promise<T | null> {
  try {
    const res = await fetch(
      `${process.env.PAPERBOXD_API_URL?.replace(/\/$/, "")}/api/v1/analytics/${path}`,
      { headers: { "X-Internal-Secret": process.env.INTERNAL_SECRET ?? "" }, next: { revalidate } }
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
