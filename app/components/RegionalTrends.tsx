"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, MapPin, Calendar, Users } from "lucide-react"

const indianTrends = [
  { topic: "IPL 2024 Final", searches: "12M+", category: "Sports", timeframe: "Last 24h", growth: "+340%" },
  {
    topic: "Bollywood Box Office",
    searches: "8.5M+",
    category: "Entertainment",
    timeframe: "This week",
    growth: "+245%",
  },
  { topic: "Monsoon Forecast", searches: "6.2M+", category: "Weather", timeframe: "Last 7 days", growth: "+189%" },
  { topic: "Digital Rupee Launch", searches: "4.8M+", category: "Finance", timeframe: "This month", growth: "+156%" },
  { topic: "Diwali Shopping", searches: "3.9M+", category: "Festival", timeframe: "Seasonal", growth: "+298%" },
]

export function RegionalTrends() {
  return (
    <div className="grid grid-cols-1 gap-8">
      {/* India Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-600" />
            🇮🇳 India Trending
          </CardTitle>
          <CardDescription>Most searched topics in India right now</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {indianTrends.map((trend, index) => (
              <div key={index} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{trend.topic}</h3>
                  <TrendingUp className="w-4 h-4 text-green-600 mt-1" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {trend.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {trend.searches}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {trend.timeframe}
                  </span>
                  <span className="text-green-600 font-medium">{trend.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
