"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, RefreshCw, Wifi, WifiOff } from "lucide-react"
import { useRealTimeTrends } from "../hooks/useRealTimeTrends"

export function LiveTrendsWidget() {
  const { trends, isLoading, error } = useRealTimeTrends()

  if (error) {
    return (
      <Card className="border-red-200">
        <CardContent className="p-6 text-center">
          <WifiOff className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-red-600">Failed to load live trends</p>
          <p className="text-sm text-gray-500">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Wifi className="w-5 h-5 text-green-500" />
            <span>Live Trending in India</span>
          </div>
          {isLoading && <RefreshCw className="w-4 h-4 animate-spin" />}
        </CardTitle>
        <CardDescription>Updates every 30 seconds • Last updated: {new Date().toLocaleTimeString()}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && trends.length === 0 ? (
          // Loading skeleton
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          // Real trends data
          <div className="space-y-3">
            {trends.slice(0, 10).map((trend, index) => (
              <div
                key={`${trend.keyword}-${trend.timestamp}`}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{trend.keyword}</p>
                    <p className="text-sm text-gray-500">{trend.searches.toLocaleString()} searches</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {trend.change}
                  </Badge>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
