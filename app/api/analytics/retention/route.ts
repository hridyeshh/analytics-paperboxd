import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const base = (process.env.PAPERBOXD_API_URL ?? "").replace(/\/$/, "");
  const secret = process.env.INTERNAL_SECRET ?? "";
  const days = new URL(request.url).searchParams.get("days");
  const qs = days ? `?days=${encodeURIComponent(days)}` : "";
  try {
    const res = await fetch(`${base}/api/v1/analytics/retention${qs}`, {
      headers: { "X-Internal-Secret": secret },
      next: { revalidate: 0 },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 502 });
  }
}
