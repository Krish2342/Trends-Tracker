"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ExternalLink, TrendingUp, Loader2, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NewsArticle {
  keyword: string
  source: string
  url: string
  image: string | null
  publishedAt: string
  searches: string
  change: string
  rank: number
}

function timeAgo(dateStr: string): string {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000 / 60
  if (diff < 60) return `${Math.floor(diff)} min ago`
  if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`
  return `${Math.floor(diff / 1440)} days ago`
}

export function LocalNews() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchNews = async () => {
    setIsLoading(true)
    setError("")
    try {
      const res = await fetch("/api/live-trends")
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to fetch")
      setArticles(data.trends || [])
      setLastUpdated(new Date())
    } catch (err: any) {
      setError(err.message || "Failed to load news")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchNews, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-white">
              <ExternalLink className="w-5 h-5 text-blue-400" />
              Trending News in India
              <Badge className="bg-red-500/20 text-red-400 border border-red-500/30 text-xs animate-pulse">LIVE</Badge>
            </CardTitle>
            <CardDescription className="text-gray-400 mt-1">
              {lastUpdated ? `Updated ${timeAgo(lastUpdated.toISOString())}` : "Breaking news from across India"}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchNews}
            disabled={isLoading}
            className="text-gray-400 hover:text-white"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && articles.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
            <span className="ml-3 text-gray-400">Loading live news...</span>
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 text-red-400 py-8 justify-center">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
            <Button variant="ghost" size="sm" onClick={fetchNews} className="text-blue-400 hover:text-blue-300 ml-2">
              Retry
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article, index) => (
              <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-200 hover:-translate-y-0.5"
              >
                {article.image && (
                  <div className="w-full h-32 mb-3 rounded-lg overflow-hidden bg-white/5">
                    <img
                      src={article.image}
                      alt={article.keyword}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                    />
                  </div>
                )}
                <div className="flex items-start justify-between mb-2 gap-2">
                  <h4 className="font-medium text-sm leading-tight text-white group-hover:text-blue-300 transition-colors line-clamp-2">
                    {article.keyword}
                  </h4>
                  <TrendingUp className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                </div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {article.source}
                  </Badge>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {timeAgo(article.publishedAt)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{article.searches} est. searches</span>
                  <span className="text-green-400 font-medium">{article.change}</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
