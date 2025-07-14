"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Play, Pause, RefreshCw } from "lucide-react"
import { useRealTimeData } from "../hooks/useRealTimeData"
import { LiveIndicator } from "./LiveIndicator"

export function LiveTrendingList() {
  const { trends, lastUpdated, isLive, isConnected, totalSearches, risingTrends, toggleLiveUpdates, forceUpdate } =
    useRealTimeData(3000)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">Live Trending Searches</CardTitle>
            <CardDescription>Real-time trending topics updating every few seconds</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={toggleLiveUpdates} className="flex items-center gap-2">
              {isLive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isLive ? "Pause" : "Resume"}
            </Button>
            <Button variant="outline" size="sm" onClick={forceUpdate} disabled={!isConnected}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <LiveIndicator isLive={isLive} isConnected={isConnected} lastUpdated={lastUpdated} />
      </CardHeader>
      <CardContent>
        {/* Live Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalSearches}</div>
            <div className="text-xs text-muted-foreground">Total Searches</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{risingTrends}</div>
            <div className="text-xs text-muted-foreground">Rising Trends</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{trends.length}</div>
            <div className="text-xs text-muted-foreground">Active Trends</div>
          </div>
        </div>

        {/* Trending List */}
        <div className="space-y-3">
          {trends.map((item, index) => (
            <div
              key={`${item.query}-${item.timestamp}`}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-500 ${
                Date.now() - item.timestamp < 5000
                  ? "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800"
                  : "hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground font-bold text-xs">
                  {item.rank}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.query}</span>
                    {Date.now() - item.timestamp < 5000 && (
                      <Badge variant="default" className="text-xs animate-pulse">
                        NEW
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{item.searches} searches</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div
                    className={`flex items-center space-x-1 ${
                      item.trend === "up" ? "text-green-600" : item.trend === "down" ? "text-red-600" : "text-gray-600"
                    }`}
                  >
                    {item.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span className="font-medium text-sm">{item.change}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
