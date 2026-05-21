"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Clock } from "lucide-react"

interface SearchResultsProps {
  searchTerm: string
  isLoading?: boolean
}

export function SearchResults({ searchTerm, isLoading = false }: SearchResultsProps) {
  if (!searchTerm) return null

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Generate some mock results based on search term
  const generateResults = (term: string) => {
    const baseResults = [
      { title: `${term} - Latest News`, type: "News", trend: "up", change: "+45%" },
      { title: `${term} - Wikipedia`, type: "Reference", trend: "stable", change: "0%" },
      { title: `${term} - Official Website`, type: "Official", trend: "up", change: "+23%" },
      { title: `${term} - Reviews`, type: "Reviews", trend: "up", change: "+67%" },
      { title: `${term} - Social Media`, type: "Social", trend: "up", change: "+89%" },
    ]
    return baseResults
  }

  const results = generateResults(searchTerm)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Search Results for "{searchTerm}"
        </CardTitle>
        <CardDescription>
          Found {results.length} trending results • Updated {new Date().toLocaleTimeString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {results.map((result, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-medium">{result.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {result.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Just now
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {result.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : result.trend === "down" ? (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-gray-400" />
                )}
                <span
                  className={`text-sm font-medium ${
                    result.trend === "up"
                      ? "text-green-600"
                      : result.trend === "down"
                        ? "text-red-600"
                        : "text-gray-600"
                  }`}
                >
                  {result.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
