"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Radio } from "lucide-react"

interface TrendingTopic {
  topic: string
  change: string
  trend: "up" | "down"
  category: string
  timestamp: number
}

const initialTopics: TrendingTopic[] = [
  { topic: "IPL 2024", change: "+2,340%", trend: "up", category: "Sports", timestamp: Date.now() },
  { topic: "Bollywood Box Office", change: "+1,890%", trend: "up", category: "Entertainment", timestamp: Date.now() },
  { topic: "All Blacks vs Wallabies", change: "+1,456%", trend: "up", category: "Sports", timestamp: Date.now() },
  { topic: "Mumbai Local Train", change: "+1,234%", trend: "up", category: "Transport", timestamp: Date.now() },
  { topic: "Auckland House Prices", change: "+987%", trend: "up", category: "Real Estate", timestamp: Date.now() },
  { topic: "Diwali Shopping", change: "+876%", trend: "up", category: "Festival", timestamp: Date.now() },
  { topic: "New Zealand Tourism", change: "+765%", trend: "up", category: "Travel", timestamp: Date.now() },
  { topic: "Indian Elections 2024", change: "+654%", trend: "up", category: "Politics", timestamp: Date.now() },
  { topic: "Kiwi Dollar Exchange", change: "-234%", trend: "down", category: "Finance", timestamp: Date.now() },
  { topic: "Monsoon Weather India", change: "+543%", trend: "up", category: "Weather", timestamp: Date.now() },
]

export function TrendingTopics() {
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>(initialTopics)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTrendingTopics((prevTopics) => {
        const newTopics = [...prevTopics]

        // Update 1-2 random topics
        const indicesToUpdate = Array.from({ length: Math.floor(Math.random() * 2) + 1 }, () =>
          Math.floor(Math.random() * newTopics.length),
        )

        indicesToUpdate.forEach((index) => {
          const topic = newTopics[index]
          const changeValue = Math.floor(Math.random() * 1000) + 100
          const isPositive = Math.random() > 0.2 // 80% chance of positive trend

          newTopics[index] = {
            ...topic,
            change: `${isPositive ? "+" : "-"}${changeValue}%`,
            trend: isPositive ? "up" : "down",
            timestamp: Date.now(),
          }
        })

        return newTopics
      })

      setLastUpdated(new Date())
    }, 8000) // Update every 8 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-red-500 animate-pulse" />
          Trending Now
        </CardTitle>
        <CardDescription>Live updates • Last updated: {lastUpdated.toLocaleTimeString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trendingTopics.map((item, index) => (
            <div
              key={`${item.topic}-${index}`}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-500 ${
                Date.now() - item.timestamp < 10000
                  ? "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800"
                  : "hover:bg-muted/50"
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{item.topic}</span>
                  {item.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  {Date.now() - item.timestamp < 10000 && (
                    <Badge variant="default" className="text-xs animate-pulse">
                      UPDATED
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                  <span className={`text-sm font-medium ${item.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {item.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
