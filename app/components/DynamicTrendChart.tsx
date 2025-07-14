"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"

interface TrendChartProps {
  searchTerm?: string
  timeRange?: string
  region?: string
}

// Generate dynamic data based on search term
const generateTrendData = (searchTerm: string, timeRange = "12m") => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // Base interest level varies by search term popularity
  const getBaseInterest = (term: string) => {
    const popularTerms = ["cricket", "ipl", "bollywood", "weather", "election"]
    const isPopular = popularTerms.some((popular) => term.toLowerCase().includes(popular))
    return isPopular ? 60 : 30
  }

  // Generate seasonal patterns based on search term
  const getSeasonalMultiplier = (term: string, monthIndex: number) => {
    const lowerTerm = term.toLowerCase()

    // Cricket/IPL peaks during March-May
    if (lowerTerm.includes("cricket") || lowerTerm.includes("ipl")) {
      return monthIndex >= 2 && monthIndex <= 4 ? 1.5 : 1.0
    }

    // Bollywood peaks during festival seasons
    if (lowerTerm.includes("bollywood") || lowerTerm.includes("movie")) {
      return monthIndex === 9 || monthIndex === 10 ? 1.4 : 1.0 // Oct-Nov (Diwali)
    }

    // Weather searches peak during monsoon
    if (lowerTerm.includes("weather") || lowerTerm.includes("monsoon")) {
      return monthIndex >= 5 && monthIndex <= 8 ? 1.6 : 0.8 // Jun-Sep
    }

    // Festival searches peak during festival months
    if (lowerTerm.includes("festival") || lowerTerm.includes("diwali")) {
      return monthIndex === 9 || monthIndex === 10 ? 2.0 : 0.6
    }

    return 1.0
  }

  const baseInterest = getBaseInterest(searchTerm)

  return months.map((month, index) => {
    const seasonal = getSeasonalMultiplier(searchTerm, index)
    const randomVariation = 0.8 + Math.random() * 0.4 // ±20% variation
    const interest = Math.min(100, Math.max(10, baseInterest * seasonal * randomVariation))

    return {
      month,
      interest: Math.round(interest),
    }
  })
}

export function DynamicTrendChart({
  searchTerm = "Cricket World Cup",
  timeRange = "12m",
  region = "all-india",
}: TrendChartProps) {
  const [data, setData] = useState(generateTrendData(searchTerm, timeRange))
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true)
      // Simulate API call delay
      const timer = setTimeout(() => {
        const newData = generateTrendData(searchTerm, timeRange)
        setData(newData)
        setIsLoading(false)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [searchTerm, timeRange, region])

  if (isLoading) {
    return (
      <div className="h-80 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="month" className="text-xs" tick={{ fill: "currentColor" }} />
          <YAxis className="text-xs" tick={{ fill: "currentColor" }} />
          <Tooltip
            formatter={(value) => [`${value}%`, "Interest"]}
            labelFormatter={(label) => `Month: ${label}`}
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
              color: "hsl(var(--foreground))",
            }}
          />
          <Line
            type="monotone"
            dataKey="interest"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
