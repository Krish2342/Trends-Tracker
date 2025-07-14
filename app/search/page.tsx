"use client"

import type React from "react"

import { useState, Suspense, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Share2, Download, RefreshCw } from "lucide-react"
import { DynamicTrendChart } from "../components/DynamicTrendChart"
import { RegionMap } from "../components/RegionMap"
import { getRelatedData, generateContextualRelated } from "../utils/relatedData"
import { SearchResults } from "../components/SearchResults"

function SearchContent() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "")
  const [timeRange, setTimeRange] = useState("12m")
  const [region, setRegion] = useState("all-india")
  const [category, setCategory] = useState("all")
  const [relatedData, setRelatedData] = useState(getRelatedData(""))
  const [isLoadingRelated, setIsLoadingRelated] = useState(false)

  // Update related data when search term changes
  useEffect(() => {
    if (searchTerm) {
      setIsLoadingRelated(true)
      // Simulate API call delay
      const timer = setTimeout(() => {
        const newRelatedData = generateContextualRelated(searchTerm, category)
        setRelatedData(newRelatedData)
        setIsLoadingRelated(false)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [searchTerm, category])

  const handleSearch = () => {
    if (!searchTerm.trim()) return

    // Update URL and trigger search
    const params = new URLSearchParams()
    params.set("q", searchTerm.trim())
    if (timeRange !== "12m") params.set("time", timeRange)
    if (region !== "all-india") params.set("region", region)
    if (category !== "all") params.set("cat", category)

    // Update the URL without page reload
    const newUrl = `/search?${params.toString()}`
    window.history.pushState({}, "", newUrl)

    // Force update related data immediately
    setIsLoadingRelated(true)
    setTimeout(() => {
      const newRelatedData = generateContextualRelated(searchTerm.trim(), category)
      setRelatedData(newRelatedData)
      setIsLoadingRelated(false)
    }, 300)
  }

  // Also update the key press handler:
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSearch()
    }
  }

  const refreshRelatedData = () => {
    if (searchTerm) {
      setIsLoadingRelated(true)
      setTimeout(() => {
        const newRelatedData = generateContextualRelated(searchTerm, category)
        setRelatedData(newRelatedData)
        setIsLoadingRelated(false)
      }, 500)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Search Trends in India</h1>

        {/* Search Controls */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="md:col-span-2">
            <Input
              type="text"
              placeholder="Enter search term..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyPress} // Changed from onKeyPress to onKeyDown
            />
          </div>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger>
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Past hour</SelectItem>
              <SelectItem value="1d">Past day</SelectItem>
              <SelectItem value="7d">Past 7 days</SelectItem>
              <SelectItem value="30d">Past 30 days</SelectItem>
              <SelectItem value="12m">Past 12 months</SelectItem>
              <SelectItem value="5y">Past 5 years</SelectItem>
            </SelectContent>
          </Select>

          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger>
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-india">🇮🇳 All India</SelectItem>
              <SelectItem value="north-india">North India</SelectItem>
              <SelectItem value="south-india">South India</SelectItem>
              <SelectItem value="west-india">West India</SelectItem>
              <SelectItem value="east-india">East India</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="chennai">Chennai</SelectItem>
              <SelectItem value="kolkata">Kolkata</SelectItem>
              <SelectItem value="hyderabad">Hyderabad</SelectItem>
              <SelectItem value="pune">Pune</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleSearch} className="w-full">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-sm text-muted-foreground mr-2">Categories:</span>
          {["all", "technology", "sports", "entertainment", "business", "health", "science"].map((cat) => (
            <Badge
              key={cat}
              variant={category === cat ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => setCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Badge>
          ))}
        </div>
      </div>

      {/* Results */}
      {searchTerm && (
        <div className="space-y-8">
          {/* Search Context Info */}
          <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                    Showing results for: "{searchTerm}"
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {region !== "all-india"
                      ? `in ${region.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}`
                      : "All India"}{" "}
                    • {timeRange === "12m" ? "Past 12 months" : `Past ${timeRange}`}
                    {category !== "all" && ` • ${category.charAt(0).toUpperCase() + category.slice(1)} category`}
                  </p>
                </div>
                <Badge variant="outline" className="bg-white dark:bg-gray-800">
                  {Math.floor(Math.random() * 50 + 10)}M+ results
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Immediate Search Results */}
          <SearchResults searchTerm={searchTerm} isLoading={isLoadingRelated} />

          {/* Main Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Interest over time: "{searchTerm}"</CardTitle>
                <CardDescription>Search interest relative to the highest point on the chart</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DynamicTrendChart searchTerm={searchTerm} timeRange={timeRange} region={region} />
            </CardContent>
          </Card>

          {/* Regional Interest */}
          <Card>
            <CardHeader>
              <CardTitle>Interest by region</CardTitle>
              <CardDescription>See in which Indian state/city your term was most popular</CardDescription>
            </CardHeader>
            <CardContent>
              <RegionMap />
            </CardContent>
          </Card>

          {/* Related Queries and Topics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Related queries</CardTitle>
                  <CardDescription>Users searching for "{searchTerm}" also searched for these queries</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={refreshRelatedData} disabled={isLoadingRelated}>
                  <RefreshCw className={`w-4 h-4 ${isLoadingRelated ? "animate-spin" : ""}`} />
                </Button>
              </CardHeader>
              <CardContent>
                {isLoadingRelated ? (
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {relatedData.queries.map((query, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => {
                          setSearchTerm(query.query)
                          handleSearch()
                        }}
                      >
                        <span className="font-medium">{query.query}</span>
                        <div className="flex items-center space-x-2">
                          <Badge variant={query.trend === "rising" ? "default" : "secondary"}>{query.trend}</Badge>
                          <span className="text-sm text-muted-foreground">{query.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Related topics</CardTitle>
                  <CardDescription>Users searching for "{searchTerm}" also searched for these topics</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={refreshRelatedData} disabled={isLoadingRelated}>
                  <RefreshCw className={`w-4 h-4 ${isLoadingRelated ? "animate-spin" : ""}`} />
                </Button>
              </CardHeader>
              <CardContent>
                {isLoadingRelated ? (
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {relatedData.topics.map((topic, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => {
                          setSearchTerm(topic.query)
                          handleSearch()
                        }}
                      >
                        <span className="font-medium">{topic.query}</span>
                        <div className="flex items-center space-x-2">
                          <Badge variant={topic.trend === "rising" ? "default" : "secondary"}>{topic.trend}</Badge>
                          <span className="text-sm text-muted-foreground">{topic.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Search Suggestions */}
          {searchTerm && (
            <Card>
              <CardHeader>
                <CardTitle>Try these related searches</CardTitle>
                <CardDescription>Discover more insights with these popular search combinations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {relatedData.queries.slice(0, 8).map((query, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => {
                        setSearchTerm(query.query)
                        handleSearch()
                      }}
                    >
                      {query.query}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Empty State */}
      {!searchTerm && (
        <Card className="text-center py-12">
          <CardContent>
            <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Start exploring Indian trends</h3>
            <p className="text-muted-foreground mb-6">
              Enter a search term above to discover trending topics, related queries, and regional interest data across
              India.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">Popular searches:</span>
              {["Cricket", "Bollywood", "IPL", "Weather", "Technology"].map((term) => (
                <Badge
                  key={term}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => {
                    setSearchTerm(term)
                    handleSearch()
                  }}
                >
                  {term}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  )
}
