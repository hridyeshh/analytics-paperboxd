import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${process.env.PAPERBOXD_API_URL}/api/v1/analytics/users`, {
    headers: { "X-Internal-Secret": process.env.INTERNAL_SECRET ?? "" },
    next: { revalidate: 120 },
  });
  if (!res.ok) return NextResponse.json({ error: "upstream error" }, { status: res.status });
  return NextResponse.json(await res.json());
}
