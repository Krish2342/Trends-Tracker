"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, MapPin, Loader2, AlertCircle, RefreshCw, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Trend {
  rank: number
  query: string
  source: string
  url: string
  category: string
  change: string
  publishedAt: string
  image?: string | null
}

function timeAgo(dateStr: string): string {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000 / 60
  if (diff < 60) return `${Math.floor(diff)}m ago`
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`
  return `${Math.floor(diff / 1440)}d ago`
}

const CATEGORIES = [
  { key: "all", label: "All", color: "from-blue-500 to-purple-500" },
  { key: "sports", label: "Sports", color: "from-green-500 to-emerald-500" },
  { key: "entertainment", label: "Entertainment", color: "from-purple-500 to-pink-500" },
  { key: "technology", label: "Technology", color: "from-blue-500 to-cyan-500" },
  { key: "business", label: "Business", color: "from-yellow-500 to-orange-500" },
]

export function RegionalTrends() {
  const [trends, setTrends] = useState<Trend[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchTrends = async (cat: string) => {
    setIsLoading(true)
    setError("")
    try {
      const res = await fetch(`/api/realtime?cat=${cat}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to fetch")
      setTrends(data.data || [])
      setLastUpdated(new Date())
    } catch (err: any) {
      setError(err.message || "Failed to load trends")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTrends(activeCategory)
  }, [activeCategory])

  return (
    <div className="grid grid-cols-1 gap-8">
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <CardTitle className="flex items-center gap-2 text-white">
                <MapPin className="w-5 h-5 text-orange-400" />
                🇮🇳 India Trending
              </CardTitle>
              <CardDescription className="text-gray-400 mt-1">
                {lastUpdated ? `Live • ${timeAgo(lastUpdated.toISOString())}` : "Most searched topics in India right now"}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fetchTrends(activeCategory)}
              disabled={isLoading}
              className="text-gray-400 hover:text-white"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border ${
                  activeCategory === cat.key
                    ? `bg-gradient-to-r ${cat.color} text-white border-transparent`
                    : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white bg-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
              <span className="ml-2 text-gray-400 text-sm">Loading trends...</span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-2 text-red-400 py-8 text-center">
              <AlertCircle className="w-6 h-6" />
              <span className="text-sm">{error}</span>
              <Button variant="ghost" size="sm" onClick={() => fetchTrends(activeCategory)} className="text-blue-400 hover:text-blue-300">
                Retry
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trends.map((trend, index) => (
                <a
                  key={index}
                  href={trend.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-200 hover:-translate-y-0.5 block"
                >
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <h3 className="font-semibold text-sm text-white group-hover:text-blue-300 transition-colors leading-snug line-clamp-2">
                      {trend.query}
                    </h3>
                    <TrendingUp className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  </div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {trend.category}
                    </Badge>
                    <span className="text-[10px] text-gray-500">{trend.source}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      {timeAgo(trend.publishedAt)}
                    </span>
                    <span className="text-green-400 font-semibold">{trend.change}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
