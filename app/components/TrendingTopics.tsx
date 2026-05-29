"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Radio, Loader2, AlertCircle, ExternalLink, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TrendingTopic {
  rank: number
  query: string
  source: string
  url: string
  category: string
  change: string
  trend: "up" | "down"
  timestamp: number
  publishedAt: string
}

function timeAgo(dateStr: string): string {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000 / 60
  if (diff < 1) return "just now"
  if (diff < 60) return `${Math.floor(diff)}m ago`
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`
  return `${Math.floor(diff / 1440)}d ago`
}

export function TrendingTopics() {
  const [topics, setTopics] = useState<TrendingTopic[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchTopics = async () => {
    setIsLoading(true)
    setError("")
    try {
      const res = await fetch("/api/realtime?cat=all")
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to fetch")
      setTopics(data.data || [])
      setLastUpdated(new Date())
    } catch (err: any) {
      setError(err.message || "Failed to load trending topics")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTopics()
    // Auto-refresh every 3 minutes
    const interval = setInterval(fetchTopics, 3 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const categoryColors: Record<string, string> = {
    Sports: "bg-green-500/10 text-green-400 border-green-500/20",
    Entertainment: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    Technology: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Politics: "bg-red-500/10 text-red-400 border-red-500/20",
    Business: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Weather: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    Health: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    News: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  }

  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-white">
              <Radio className="w-5 h-5 text-red-500 animate-pulse" />
              Trending Now
            </CardTitle>
            <CardDescription className="text-gray-400 mt-1">
              {lastUpdated
                ? `Live • Updated ${timeAgo(lastUpdated.toISOString())}`
                : "Real-time topics from India"}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchTopics}
            disabled={isLoading}
            className="text-gray-400 hover:text-white"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && topics.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
            <span className="ml-2 text-gray-400 text-sm">Loading trends...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-2 text-red-400 py-8 text-center">
            <AlertCircle className="w-6 h-6" />
            <span className="text-sm">{error}</span>
            <Button variant="ghost" size="sm" onClick={fetchTopics} className="text-blue-400 hover:text-blue-300">
              Retry
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {topics.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-xl border border-white/5 bg-white/3 hover:bg-white/8 hover:border-blue-500/20 transition-all duration-200 group cursor-pointer"
              >
                {/* Rank */}
                <span className="text-xs font-bold text-gray-600 mt-0.5 w-4 shrink-0">
                  {item.rank}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-1 mb-1">
                    <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors line-clamp-2 leading-tight">
                      {item.query}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      className={`text-[10px] px-1.5 py-0 border ${categoryColors[item.category] || categoryColors["News"]}`}
                    >
                      {item.category}
                    </Badge>
                    <span className="text-[10px] text-gray-500">{item.source}</span>
                    <span className="text-[10px] text-gray-600">{timeAgo(item.publishedAt)}</span>
                  </div>
                </div>

                {/* Trend indicator */}
                <div className="flex flex-col items-end gap-1 shrink-0">
                  {item.trend === "up" ? (
                    <TrendingUp className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-red-400" />
                  )}
                  <span className={`text-[10px] font-semibold ${item.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                    {item.change}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
