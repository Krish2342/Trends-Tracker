"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, Search } from "lucide-react"
import { getRelatedData } from "../utils/relatedData"

interface SmartSuggestionsProps {
  searchTerm: string
  onSuggestionClick: (suggestion: string) => void
}

export function SmartSuggestions({ searchTerm, onSuggestionClick }: SmartSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true)
      // Simulate AI-powered suggestion generation
      setTimeout(() => {
        const relatedData = getRelatedData(searchTerm)
        const smartSuggestions = [
          `${searchTerm} vs competitors`,
          `${searchTerm} trends 2024`,
          `${searchTerm} in India`,
          `${searchTerm} in New Zealand`,
          `${searchTerm} news today`,
          `${searchTerm} analysis`,
          ...relatedData.queries.slice(0, 3).map((q) => q.query),
        ]

        setSuggestions(smartSuggestions.slice(0, 8))
        setIsLoading(false)
      }, 800)
    }
  }, [searchTerm])

  if (!searchTerm || suggestions.length === 0) return null

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-900 dark:text-purple-100">
          <Lightbulb className="w-5 h-5" />
          Smart Suggestions
        </CardTitle>
        <CardDescription className="text-purple-700 dark:text-purple-300">
          AI-powered suggestions based on your search for "{searchTerm}"
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-8 bg-purple-200 dark:bg-purple-800 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="justify-start text-left h-auto p-3 bg-white dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900 border-purple-200 dark:border-purple-700"
                onClick={() => onSuggestionClick(suggestion)}
              >
                <div className="flex items-center gap-2 w-full">
                  <Search className="w-3 h-3 text-purple-600" />
                  <span className="text-xs truncate">{suggestion}</span>
                </div>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
