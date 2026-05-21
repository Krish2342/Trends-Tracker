"use client"

import { useState, useEffect } from "react"

interface TrendData {
  keyword: string
  searches: number
  change: string
  timestamp: Date
}

export function useRealTimeTrends() {
  const [trends, setTrends] = useState<TrendData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Function to fetch new trends data
    const fetchTrends = async () => {
      try {
        setError(null)

        // In real app, this would call Google Trends API
        // For demo, we'll simulate data
        const response = await fetch("/api/live-trends")

        if (!response.ok) {
          throw new Error("Failed to fetch trends")
        }

        const data = await response.json()
        setTrends(data.trends)
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
        setIsLoading(false)
      }
    }

    // Fetch data immediately
    fetchTrends()

    // Then fetch every 30 seconds (real-time updates)
    const interval = setInterval(fetchTrends, 30000)

    // Cleanup when component unmounts
    return () => clearInterval(interval)
  }, [])

  return { trends, isLoading, error }
}
