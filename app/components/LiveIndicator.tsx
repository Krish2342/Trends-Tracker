"use client"

import { Badge } from "@/components/ui/badge"
import { WifiOff, Radio } from "lucide-react"

interface LiveIndicatorProps {
  isLive: boolean
  isConnected: boolean
  lastUpdated: Date
}

export function LiveIndicator({ isLive, isConnected, lastUpdated }: LiveIndicatorProps) {
  const getStatusColor = () => {
    if (!isConnected) return "bg-red-500"
    if (isLive) return "bg-green-500"
    return "bg-yellow-500"
  }

  const getStatusText = () => {
    if (!isConnected) return "Disconnected"
    if (isLive) return "Live"
    return "Paused"
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${getStatusColor()} ${isLive && isConnected ? "animate-pulse" : ""}`} />
        <Badge variant={isLive && isConnected ? "default" : "secondary"} className="text-xs">
          {isConnected ? <Radio className="w-3 h-3 mr-1" /> : <WifiOff className="w-3 h-3 mr-1" />}
          {getStatusText()}
        </Badge>
      </div>
      <span className="text-xs text-muted-foreground">Updated: {lastUpdated.toLocaleTimeString()}</span>
    </div>
  )
}
