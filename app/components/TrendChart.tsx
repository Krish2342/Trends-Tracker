"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", interest: 65 },
  { month: "Feb", interest: 72 },
  { month: "Mar", interest: 68 },
  { month: "Apr", interest: 85 },
  { month: "May", interest: 92 },
  { month: "Jun", interest: 88 },
  { month: "Jul", interest: 95 },
  { month: "Aug", interest: 100 },
  { month: "Sep", interest: 87 },
  { month: "Oct", interest: 90 },
  { month: "Nov", interest: 94 },
  { month: "Dec", interest: 89 },
]

export function TrendChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="month" className="text-xs" tick={{ fill: "currentColor" }} />
          <YAxis className="text-xs" tick={{ fill: "currentColor" }} />
          <Tooltip
            formatter={(value) => [`${value}%`, "Interest"]}
            labelFormatter={(label) => `Month: ${label}`}
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
              color: "hsl(var(--foreground))",
            }}
          />
          <Line
            type="monotone"
            dataKey="interest"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
