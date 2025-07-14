"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartData {
  time: string
  searches: number
}

export function RealTimeChart() {
  const [data, setData] = useState<ChartData[]>([])

  useEffect(() => {
    // Initialize with some data points
    const initialData: ChartData[] = []
    const now = new Date()

    for (let i = 19; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 30000) // 30 seconds ago
      initialData.push({
        time: time.toLocaleTimeString(),
        searches: Math.floor(Math.random() * 1000) + 500,
      })
    }

    setData(initialData)

    // Update chart every 30 seconds with new data
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData]

        // Remove oldest point
        newData.shift()

        // Add new point
        newData.push({
          time: new Date().toLocaleTimeString(),
          searches: Math.floor(Math.random() * 1000) + 500,
        })

        return newData
      })
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Search Volume</CardTitle>
        <CardDescription>Real-time search activity in India (updates every 30 seconds)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`${value}`, "Searches per minute"]}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="searches"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
                isAnimationActive={true}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
