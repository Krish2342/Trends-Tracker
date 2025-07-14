"use client"

import { useState, useEffect, useCallback } from "react"

interface TrendingItem {
  rank: number
  query: string
  searches: string
  change: string
  trend: "up" | "down" | "stable"
  category: string
  timestamp: number
}

interface RealTimeData {
  trends: TrendingItem[]
  lastUpdated: Date
  isLive: boolean
  totalSearches: string
  risingTrends: number
}

const generateRandomTrend = (): TrendingItem => {
  const queries = [
    "IPL Live Score",
    "Bollywood News",
    "All Blacks Match",
    "Mumbai Weather",
    "Auckland Traffic",
    "Diwali Shopping",
    "Rugby World Cup",
    "Indian Elections",
    "New Zealand Tourism",
    "Cricket Highlights",
    "Monsoon Update",
    "Kiwi Dollar",
    "Bangalore IT Jobs",
    "Wellington Events",
    "Tamil Movies",
    "Christchurch News",
  ]

  const categories = ["Sports", "Entertainment", "News", "Weather", "Finance", "Technology", "Politics"]

  const searchVolumes = ["1.2M+", "2.5M+", "890K+", "3.1M+", "1.8M+", "650K+", "4.2M+"]
  const changes = ["+234%", "+456%", "+123%", "+789%", "-89%", "+345%", "+567%", "-45%"]

  return {
    rank: Math.floor(Math.random() * 10) + 1,
    query: queries[Math.floor(Math.random() * queries.length)],
    searches: searchVolumes[Math.floor(Math.random() * searchVolumes.length)],
    change: changes[Math.floor(Math.random() * changes.length)],
    trend: Math.random() > 0.8 ? "down" : "up",
    category: categories[Math.floor(Math.random() * categories.length)],
    timestamp: Date.now(),
  }
}

export function useRealTimeData(updateInterval = 5000) {
  const [data, setData] = useState<RealTimeData>({
    trends: [],
    lastUpdated: new Date(),
    isLive: true,
    totalSearches: "12.5M+",
    risingTrends: 8,
  })

  const [isConnected, setIsConnected] = useState(true)

  const updateData = useCallback(() => {
    // Simulate some trends staying, some changing
    setData((prevData) => {
      const newTrends = [...prevData.trends]

      // Update 2-3 random trends
      const indicesToUpdate = Array.from({ length: Math.floor(Math.random() * 3) + 2 }, () =>
        Math.floor(Math.random() * Math.min(newTrends.length, 10)),
      )

      indicesToUpdate.forEach((index) => {
        if (index < newTrends.length) {
          const updatedTrend = generateRandomTrend()
          updatedTrend.rank = index + 1
          newTrends[index] = updatedTrend
        }
      })

      // If we have less than 10 trends, add new ones
      while (newTrends.length < 10) {
        const newTrend = generateRandomTrend()
        newTrend.rank = newTrends.length + 1
        newTrends.push(newTrend)
      }

      // Sort by rank
      newTrends.sort((a, b) => a.rank - b.rank)

      return {
        ...prevData,
        trends: newTrends,
        lastUpdated: new Date(),
        totalSearches: `${(Math.random() * 5 + 10).toFixed(1)}M+`,
        risingTrends: newTrends.filter((t) => t.trend === "up").length,
      }
    })
  }, [])

  useEffect(() => {
    // Initialize with some data
    const initialTrends = Array.from({ length: 10 }, (_, index) => {
      const trend = generateRandomTrend()
      trend.rank = index + 1
      return trend
    })

    setData((prevData) => ({
      ...prevData,
      trends: initialTrends,
    }))

    // Set up real-time updates
    const interval = setInterval(() => {
      if (isConnected) {
        updateData()
      }
    }, updateInterval)

    // Simulate occasional connection issues
    const connectionInterval = setInterval(() => {
      setIsConnected((prev) => (Math.random() > 0.1 ? true : prev)) // 90% uptime
    }, 30000)

    return () => {
      clearInterval(interval)
      clearInterval(connectionInterval)
    }
  }, [updateInterval, updateData, isConnected])

  const toggleLiveUpdates = useCallback(() => {
    setData((prevData) => ({
      ...prevData,
      isLive: !prevData.isLive,
    }))
  }, [])

  const forceUpdate = useCallback(() => {
    updateData()
  }, [updateData])

  return {
    ...data,
    isConnected,
    toggleLiveUpdates,
    forceUpdate,
  }
}
