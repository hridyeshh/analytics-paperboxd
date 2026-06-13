"use client";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

type Props = {
  data: { name: string; events: number; unique_users: number }[];
};

export default function FeatureBarChart({ data }: Props) {
  const top = data.slice(0, 12);
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={top} layout="vertical" margin={{ top: 0, right: 16, left: 8, bottom: 0 }}>
        <CartesianGrid stroke="#2a2d2b" strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 10, fill: "#6b6b5b" }} tickLine={false} axisLine={false} />
        <YAxis type="category" dataKey="name" width={160}
          tick={{ fontSize: 10, fill: "#6b6b5b", fontFamily: "monospace" }} tickLine={false} axisLine={false}
          tickFormatter={s => s.replace(/\./g, " › ")} />
        <Tooltip
          contentStyle={{ background: "#1a1c1b", border: "1px solid #2a2d2b", borderRadius: 6, fontSize: 12, fontFamily: "monospace" }}
          labelStyle={{ color: "#e8e2d5" }}
        />
        <Bar dataKey="events"       fill="#4a9d5b" opacity={0.9} radius={[0,3,3,0]} name="events" />
        <Bar dataKey="unique_users" fill="#c4862d" opacity={0.7} radius={[0,3,3,0]} name="unique users" />
      </BarChart>
    </ResponsiveContainer>
  );
}
