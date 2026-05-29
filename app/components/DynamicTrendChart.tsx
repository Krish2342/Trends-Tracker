"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"
import { Loader2, AlertCircle, ExternalLink } from "lucide-react"

interface ChartPoint {
  month: string
  date: string
  value: number
}

interface RelatedArticle {
  title: string
  url: string
  source: string
  publishedAt: string
}

interface TrendChartProps {
  searchTerm?: string
  timeRange?: string
  region?: string
  chartData?: ChartPoint[]
  articles?: RelatedArticle[]
  isLoading?: boolean
  error?: string
}

export function DynamicTrendChart({
  searchTerm = "Cricket World Cup",
  timeRange = "12m",
  region = "all-india",
  chartData,
  articles: propArticles,
  isLoading: propIsLoading,
  error: propError,
}: TrendChartProps) {
  const [data, setData] = useState<ChartPoint[]>([])
  const [articles, setArticles] = useState<RelatedArticle[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Use props if they are provided, otherwise fall back to local state
  const displayData = chartData !== undefined ? chartData : data
  const displayArticles = propArticles !== undefined ? propArticles : articles
  const displayIsLoading = propIsLoading !== undefined ? propIsLoading : isLoading
  const displayError = propError !== undefined ? propError : error

  useEffect(() => {
    // If the parent component passed the data, do not perform local fetching
    if (chartData !== undefined) return

    if (!searchTerm) return

    setIsLoading(true)
    setError("")

    const controller = new AbortController()

    fetch(
      `/api/trends?q=${encodeURIComponent(searchTerm)}&time=${timeRange}&region=${region}`,
      { signal: controller.signal }
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.error) throw new Error(json.error)
        const points: ChartPoint[] = (json.data?.interest_over_time || []).map((p: any) => ({
          month: p.month || p.date?.slice(5, 7) || "",
          date: p.date,
          value: p.value,
        }))
        setData(points)
        setArticles(json.articles || [])
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message || "Failed to load chart data")
      })
      .finally(() => setIsLoading(false))

    return () => controller.abort()
  }, [searchTerm, timeRange, region, chartData])

  if (displayIsLoading) {
    return (
      <div className="h-80 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        <span className="ml-3 text-gray-400 text-sm">Fetching real trend data...</span>
      </div>
    )
  }

  if (displayError) {
    return (
      <div className="h-80 flex flex-col items-center justify-center gap-2 text-red-400">
        <AlertCircle className="h-8 w-8" />
        <span className="text-sm">{displayError}</span>
      </div>
    )
  }

  if (displayData.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center text-gray-500 text-sm">
        No trend data available for "{searchTerm}"
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={displayData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip
              formatter={(value) => [`${value}`, "Interest Index"]}
              labelFormatter={(label) => `Month: ${label}`}
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.85)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                color: "#fff",
                backdropFilter: "blur(10px)",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#trendGradient)"
              strokeWidth={3}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 3 }}
              activeDot={{ r: 6, fill: "#818cf8" }}
            />
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Related real articles */}
      {displayArticles.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Related News</p>
          {displayArticles.map((article, i) => (
            <a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors group"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-gray-300 group-hover:text-white transition-colors line-clamp-1 leading-snug">
                  {article.title}
                </p>
                <p className="text-[10px] text-gray-600 mt-0.5">{article.source}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
