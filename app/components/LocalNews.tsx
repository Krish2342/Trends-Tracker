"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ExternalLink, TrendingUp } from "lucide-react"

const localNews = [
  {
    country: "India",
    flag: "🇮🇳",
    news: [
      {
        headline: "Mumbai Metro Expansion Project Approved",
        category: "Infrastructure",
        time: "2 hours ago",
        searches: "2.3M+",
        trend: "+456%",
      },
      {
        headline: "Bangalore IT Hub Announces New Tech Park",
        category: "Technology",
        time: "4 hours ago",
        searches: "1.8M+",
        trend: "+234%",
      },
      {
        headline: "Delhi Air Quality Improvement Measures",
        category: "Environment",
        time: "6 hours ago",
        searches: "1.5M+",
        trend: "+189%",
      },
      {
        headline: "Chennai Auto Industry Growth Report",
        category: "Business",
        time: "8 hours ago",
        searches: "1.2M+",
        trend: "+156%",
      },
      {
        headline: "Kolkata Cultural Festival Announcement",
        category: "Culture",
        time: "10 hours ago",
        searches: "950K+",
        trend: "+123%",
      },
      {
        headline: "Hyderabad Smart City Initiative",
        category: "Technology",
        time: "12 hours ago",
        searches: "850K+",
        trend: "+98%",
      },
    ],
  },
]

export function LocalNews() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ExternalLink className="w-5 h-5 text-blue-600" />
          Trending Local News in India
        </CardTitle>
        <CardDescription>Breaking news and trending stories from across India</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {localNews[0].news.map((article, articleIndex) => (
            <div
              key={articleIndex}
              className="p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-sm leading-tight pr-2">{article.headline}</h4>
                <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  {article.category}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.time}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{article.searches} searches</span>
                <span className="text-green-600 font-medium">{article.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
