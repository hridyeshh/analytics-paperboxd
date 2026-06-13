"use client";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

type Props = { data: { date: string; count: number }[]; color?: string; label?: string };

export default function SimpleArea({ data, color = "#4a9d5b", label = "count" }: Props) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id={`grad-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor={color} stopOpacity={0.25} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#2a2d2b" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#6b6b5b" }} tickLine={false} axisLine={false}
          tickFormatter={d => d.slice(5)} interval="preserveStartEnd" />
        <YAxis tick={{ fontSize: 10, fill: "#6b6b5b" }} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{ background: "#1a1c1b", border: "1px solid #2a2d2b", borderRadius: 6, fontSize: 12, fontFamily: "monospace" }}
          labelStyle={{ color: "#e8e2d5" }}
          itemStyle={{ color: color }}
          formatter={(v: number) => [v.toLocaleString(), label]}
        />
        <Area type="monotone" dataKey="count" stroke={color} strokeWidth={2}
          fill={`url(#grad-${color.replace("#","")})`} dot={false} activeDot={{ r: 4 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
