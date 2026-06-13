"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

type Props = {
  data: { date: string; count: number }[];
  color?: string;
  height?: number;
  label?: string;
};

export default function SimpleBar({ data, color = "#4a9d5b", height = 160, label = "count" }: Props) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 4, right: 2, left: -28, bottom: 0 }} barSize={18}>
        <CartesianGrid stroke="#1e2120" vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#3a3d38", fontFamily: "monospace" }}
          tickLine={false} axisLine={false} tickFormatter={d => d.slice(5)} />
        <YAxis tick={{ fontSize: 9, fill: "#3a3d38", fontFamily: "monospace" }}
          tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{ background: "#171a18", border: "1px solid #1e2120", borderRadius: 6, fontSize: 11, fontFamily: "monospace" }}
          labelStyle={{ color: "#d4cfc6" }}
          itemStyle={{ color: color }}
          formatter={(v: number) => [v.toLocaleString(), label]}
        />
        <Bar dataKey="count" radius={[2, 2, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={color} fillOpacity={i === data.length - 1 ? 1 : 0.6} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
