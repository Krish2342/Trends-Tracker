"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, BarChart3, Users } from "lucide-react"
import { getRelatedData } from "../utils/relatedData"

interface RelatedInsightsProps {
  searchTerm: string
}

export function RelatedInsights({ searchTerm }: RelatedInsightsProps) {
  if (!searchTerm) return null

  const relatedData = getRelatedData(searchTerm)

  const insights = [
    {
      title: "Peak Interest",
      value: "2.4M searches",
      description: "Highest search volume in the last 30 days",
      icon: <TrendingUp className="w-5 h-5 text-green-600" />,
      trend: "+45%",
    },
    {
      title: "Related Growth",
      value: `${relatedData.queries.filter((q) => q.trend === "rising").length} rising`,
      description: "Related queries showing upward trends",
      icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
      trend: "+23%",
    },
    {
      title: "User Interest",
      value: "High engagement",
      description: "Above average user interaction",
      icon: <Users className="w-5 h-5 text-purple-600" />,
      trend: "+12%",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Insights for "{searchTerm}"</CardTitle>
        <CardDescription>Key metrics and trends for your search term</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((insight, index) => (
            <div key={index} className="p-4 rounded-lg border bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                {insight.icon}
                <Badge variant="outline" className="text-xs">
                  {insight.trend}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="font-semibold">{insight.value}</div>
                <div className="text-sm text-muted-foreground">{insight.title}</div>
                <div className="text-xs text-muted-foreground">{insight.description}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
