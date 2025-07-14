"use client"

import { LiveTrendsWidget } from "../components/LiveTrendsWidget"
import { RealTimeChart } from "../components/RealTimeChart"
import { Clock } from "lucide-react"

export default function RealTimePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2 mb-4">
          <Clock className="w-8 h-8 text-primary" />
          Real-Time Trends Dashboard
        </h1>
        <p className="text-muted-foreground">
          Live trending data from across India, updating automatically every 30 seconds
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Live Trends List */}
        <LiveTrendsWidget />

        {/* Real-time Chart */}
        <RealTimeChart />
      </div>

      {/* Status Indicator */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-700 dark:text-green-300">Live data connection active</span>
        </div>
      </div>
    </div>
  )
}
