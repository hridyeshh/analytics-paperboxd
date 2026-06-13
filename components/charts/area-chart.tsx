"use client";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

type Props = { data: { date: string; count: number }[]; color?: string; label?: string; height?: number };

export default function SimpleArea({ data, color = "#4a9d5b", label = "count", height = 180 }: Props) {
  const id = `grad-${color.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 4, right: 2, left: -28, bottom: 0 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#1e2120" strokeDasharray="0" vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#3a3d38", fontFamily: "monospace" }}
          tickLine={false} axisLine={false} tickFormatter={d => d.slice(5)} interval="preserveStartEnd" />
        <YAxis tick={{ fontSize: 9, fill: "#3a3d38", fontFamily: "monospace" }}
          tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{ background: "#171a18", border: "1px solid #1e2120", borderRadius: 6, fontSize: 11, fontFamily: "monospace" }}
          labelStyle={{ color: "#d4cfc6", marginBottom: 2 }}
          itemStyle={{ color: color }}
          formatter={(v: number) => [v.toLocaleString(), label]}
        />
        <Area type="monotone" dataKey="count" stroke={color} strokeWidth={1.5}
          fill={`url(#${id})`} dot={false} activeDot={{ r: 3, fill: color }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
