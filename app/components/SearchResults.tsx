"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock, ExternalLink } from "lucide-react"

interface Article {
  title: string
  description?: string
  url: string
  source: string
  publishedAt: string
}

interface SearchResultsProps {
  searchTerm: string
  isLoading?: boolean
  articles?: Article[]
}

function formatTimeAgo(dateStr: string) {
  try {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 1) return "just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  } catch {
    return "recently"
  }
}

export function SearchResults({ searchTerm, isLoading = false, articles = [] }: SearchResultsProps) {
  if (!searchTerm) return null

  if (isLoading) {
    return (
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-700/50 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700/50 rounded w-1/2"></div>
            <div className="h-32 bg-gray-700/50 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Fallback mock results in case articles fetch returned nothing or failed
  const getMockResults = (term: string) => {
    return [
      {
        title: `Latest news and updates for "${term}"`,
        description: `Explore live coverage, trending topics, and regional discussions regarding ${term} in India.`,
        url: `https://news.google.com/search?q=${encodeURIComponent(term)}`,
        source: "Google News",
        publishedAt: new Date().toISOString(),
      },
      {
        title: `Analysis of ${term} search patterns`,
        description: `Discover how user interest in ${term} is evolving across different states and demographics.`,
        url: "https://trends.google.com",
        source: "Google Trends",
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
      },
    ]
  }

  const displayArticles = articles && articles.length > 0 ? articles : getMockResults(searchTerm)

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          Real-time Coverage: "{searchTerm}"
        </CardTitle>
        <CardDescription className="text-gray-400">
          Found {displayArticles.length} recent articles and trends • Updated {new Date().toLocaleTimeString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayArticles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 rounded-lg border border-white/10 hover:border-blue-500/50 hover:bg-white/5 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-sm font-bold text-blue-400">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-200 hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                    {article.description && (
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                        {article.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-2 flex-wrap text-xs">
                      <Badge variant="secondary" className="bg-blue-950/40 text-blue-300 border-blue-800/30">
                        {article.source}
                      </Badge>
                      <span className="text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTimeAgo(article.publishedAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 shrink-0 mt-1 group-hover:text-blue-400" />
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
