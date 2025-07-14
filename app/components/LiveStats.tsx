"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Globe, Activity } from "lucide-react"

interface LiveStat {
  label: string
  value: string
  change: string
  icon: React.ReactNode
  color: string
}

export function LiveStats() {
  const [stats, setStats] = useState<LiveStat[]>([
    {
      label: "Active Searches",
      value: "2.4M",
      change: "+12%",
      icon: <Activity className="w-5 h-5" />,
      color: "text-blue-600",
    },
    {
      label: "Rising Trends",
      value: "847",
      change: "+23%",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-green-600",
    },
    {
      label: "Active Users",
      value: "1.8M",
      change: "+8%",
      icon: <Users className="w-5 h-5" />,
      color: "text-purple-600",
    },
    {
      label: "Global Reach",
      value: "195",
      change: "0%",
      icon: <Globe className="w-5 h-5" />,
      color: "text-orange-600",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prevStats) =>
        prevStats.map((stat) => ({
          ...stat,
          value:
            stat.label === "Global Reach"
              ? stat.value
              : `${(Number.parseFloat(stat.value.replace(/[^\d.]/g, "")) + (Math.random() - 0.5) * 0.1).toFixed(1)}${stat.value.includes("M") ? "M" : ""}`,
          change:
            stat.label === "Global Reach"
              ? stat.change
              : `${Math.random() > 0.5 ? "+" : ""}${(Math.random() * 30).toFixed(0)}%`,
        })),
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="transition-all duration-300 hover:shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className={stat.color}>{stat.icon}</div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
                <div
                  className={`text-xs font-medium ${
                    stat.change.startsWith("+")
                      ? "text-green-600"
                      : stat.change.startsWith("-")
                        ? "text-red-600"
                        : "text-gray-600"
                  }`}
                >
                  {stat.change}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
