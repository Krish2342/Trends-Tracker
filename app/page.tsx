"use client"
import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, Globe, BarChart3, Clock, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { DynamicTrendChart } from "./components/DynamicTrendChart"
import { TrendingTopics } from "./components/TrendingTopics"
import { RegionMap } from "./components/RegionMap"
import { RegionalTrends } from "./components/RegionalTrends"
import { CulturalEvents } from "./components/CulturalEvents"
import { LocalNews } from "./components/LocalNews"
import { useAuth } from "./contexts/AuthContext"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [trendingSearches, setTrendingSearches] = useState<string[]>([])
  const [featuredTrend, setFeaturedTrend] = useState("India")

  const { user, isAuthenticated, openAuthModal } = useAuth()

  // Fetch real trending topics for hero pills & featured chart
  useEffect(() => {
    fetch("/api/live-trends")
      .then((r) => r.json())
      .then((data) => {
        if (data.trends && data.trends.length > 0) {
          // Extract short keywords from news titles for the pills
          const keywords = data.trends
            .slice(0, 6)
            .map((t: any) => {
              // Take first 4-5 words of the headline as the pill label
              return t.keyword.split(" ").slice(0, 4).join(" ")
            })
          setTrendingSearches(keywords)
          // Use the first headline as the featured trend in the chart
          setFeaturedTrend(data.trends[0].keyword.split(" ").slice(0, 3).join(" "))
        }
      })
      .catch(() => {
        // Fallback to static labels on error
        setTrendingSearches(["India News", "Cricket", "Bollywood", "Tech India", "Politics"])
      })
  }, [])

  const handleSearch = () => {
    if (searchTerm.trim()) {
      if (isAuthenticated) {
        window.location.href = `/search?q=${encodeURIComponent(searchTerm.trim())}`
      } else {
        openAuthModal(() => {
          window.location.href = `/search?q=${encodeURIComponent(searchTerm.trim())}`
        })
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSearch()
    }
  }

  return (
    <div className="flex-1 bg-black">
      {/* Welcome Section for Authenticated Users */}
      {user && (
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center app-glow">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-base font-semibold text-white">Welcome back, {user.name}!</p>
                <p className="text-sm text-gray-400">Explore India's trending data insights</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 mb-4 app-glow hover:scale-105 transition-all duration-300 animate-in fade-in zoom-in-95 fill-mode-both delay-100">
                <Zap className="w-3 h-3 mr-1 animate-[icon-flicker_1.5s_linear_infinite]" />
                ANALYTICS PLATFORM
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-glow animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both delay-200">
              Explore What India is{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent animate-text-shimmer animate-pulse">
                Searching
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both delay-300">
              Real-time analytics • Exclusive insights • Advanced trending data from across India
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both delay-400">
              <div className="flex w-full relative z-10 bg-white/5 border border-white/10 rounded-lg p-1 backdrop-blur-md shadow-2xl">
                <Input
                  type="text"
                  placeholder="Enter a search term for insights..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="text-lg py-6 rounded-r-none bg-transparent border-0 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
                />
                <Button
                  onClick={handleSearch}
                  className="px-8 py-6 rounded-lg bg-blue-600 hover:bg-blue-500 text-white border-0 app-glow-animate"
                  size="lg"
                >
                  <Search className="w-5 h-5 md:mr-2" />
                  <span className="hidden md:inline">Search</span>
                </Button>
              </div>
            </div>

            {/* Trending Searches */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <span className="text-sm text-gray-400 mr-2">🔥 Trending in India:</span>
              {trendingSearches.map((term, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-600 hover:text-white transition-all border-white/20 text-gray-300 hover:border-blue-400 app-glow"
                  onClick={() => setSearchTerm(term)}
                >
                  {term}
                </Badge>
              ))}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card className="glass-card hover-glow-green hover:scale-[1.03] hover:-translate-y-2.5 transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-8 fill-mode-both delay-100 shadow-[0_0_20px_rgba(74,222,128,0.1)]">
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 mx-auto mb-4 text-green-400 animate-icon-bounce" />
                  <h3 className="font-semibold mb-2 text-white">Advanced Security</h3>
                  <p className="text-sm text-gray-400">Enterprise-grade protection and exclusive access</p>
                </CardContent>
              </Card>

              <Card className="glass-card hover-glow-yellow hover:scale-[1.03] hover:-translate-y-2.5 transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-8 fill-mode-both delay-300 shadow-[0_0_20px_rgba(250,204,21,0.1)]">
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 mx-auto mb-4 text-yellow-400 animate-icon-flicker" />
                  <h3 className="font-semibold mb-2 text-white">Real-Time Intelligence</h3>
                  <p className="text-sm text-gray-400">Live data with millisecond precision updates</p>
                </CardContent>
              </Card>

              <Card className="glass-card hover-glow-purple hover:scale-[1.03] hover:-translate-y-2.5 transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-8 fill-mode-both delay-500 shadow-[0_0_20px_rgba(192,132,252,0.1)]">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-8 h-8 mx-auto mb-4 text-purple-400 animate-icon-pulse" />
                  <h3 className="font-semibold mb-2 text-white">Deep Analytics</h3>
                  <p className="text-sm text-gray-400">Category, regional, and temporal trend breakdowns</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Trend */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  <span className="truncate max-w-xs">Featured: "{featuredTrend || "India"} "</span>
                  <Badge className="bg-red-500/20 text-red-400 border border-red-500/30 text-xs animate-pulse shrink-0">
                    LIVE
                  </Badge>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Real-time news interest from GNews India over the past 12 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DynamicTrendChart searchTerm={featuredTrend || "India"} />
              </CardContent>
            </Card>
          </div>

          {/* Trending Topics */}
          <div>
            <TrendingTopics />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <Link href="/search">
            <Card className="glass-card hover-glow-blue hover:scale-[1.04] hover:-translate-y-1.5 transition-all duration-500 ease-out cursor-pointer group animate-in fade-in slide-in-from-bottom-6 fill-mode-both delay-100 shadow-[0_0_15px_rgba(59,130,246,0.05)]">
              <CardContent className="p-6 text-center">
                <Search className="w-8 h-8 mx-auto mb-4 text-blue-400 animate-icon-scan" />
                <h3 className="font-semibold mb-2 text-white">Search</h3>
                <p className="text-sm text-gray-400">Advanced trend analysis with AI insights</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/compare">
            <Card className="glass-card hover-glow-green hover:scale-[1.04] hover:-translate-y-1.5 transition-all duration-500 ease-out cursor-pointer group animate-in fade-in slide-in-from-bottom-6 fill-mode-both delay-200 shadow-[0_0_15px_rgba(74,222,128,0.05)]">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-8 h-8 mx-auto mb-4 text-green-400 animate-icon-pulse" />
                <h3 className="font-semibold mb-2 text-white">Smart Compare</h3>
                <p className="text-sm text-gray-400">Compare up to 10 terms with analytics</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/realtime">
            <Card className="glass-card hover-glow-red hover:scale-[1.04] hover:-translate-y-1.5 transition-all duration-500 ease-out cursor-pointer group animate-in fade-in slide-in-from-bottom-6 fill-mode-both delay-300 shadow-[0_0_15px_rgba(239,68,68,0.05)]">
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 mx-auto mb-4 text-red-400 animate-icon-clock-tick" />
                <h3 className="font-semibold mb-2 text-white">Live Intelligence</h3>
                <p className="text-sm text-gray-400">Real-time data with instant notifications</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/explore">
            <Card className="glass-card hover-glow-purple hover:scale-[1.04] hover:-translate-y-1.5 transition-all duration-500 ease-out cursor-pointer group animate-in fade-in slide-in-from-bottom-6 fill-mode-both delay-400 shadow-[0_0_15px_rgba(192,132,252,0.05)]">
              <CardContent className="p-6 text-center">
                <Globe className="w-8 h-8 mx-auto mb-4 text-purple-400 animate-icon-spin-slow" />
                <h3 className="font-semibold mb-2 text-white">Regional Insights</h3>
                <p className="text-sm text-gray-400">Exclusive regional data and predictions</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Top Google Search Trends (Real-Time) */}
        <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <Card className="glass-card">
            <CardHeader className="border-b border-white/5 pb-4">
              <CardTitle className="flex items-center gap-2 text-white">
                <Search className="w-5 h-5 text-blue-400" />
                Real-Time Search Trends (India)
              </CardTitle>
              <CardDescription className="text-gray-400">
                Top surging queries over the last 24 hours based on search volume velocity.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { query: "IPL 2026 Playoffs", volume: "3.2M+", growth: "+185%", color: "bg-blue-500", percent: 95 },
                  { query: "US-Iran Ceasefire", volume: "1.8M+", growth: "+210%", color: "bg-emerald-500", percent: 85 },
                  { query: "Karnataka CM News", volume: "950K+", growth: "+120%", color: "bg-purple-500", percent: 75 },
                  { query: "NSE India / VBL", volume: "720K+", growth: "+64%", color: "bg-rose-500", percent: 65 },
                  { query: "Eid ul-Adha 2026 Wishes", volume: "550K+", growth: "+312%", color: "bg-amber-500", percent: 55 },
                  { query: "Vaibhav Sooryavanshi", volume: "410K+", growth: "+85%", color: "bg-cyan-500", percent: 45 },
                ].map((trend, i) => (
                  <div key={i} className="bg-white/[0.02] border border-white/5 p-4 rounded-xl hover:bg-white/[0.04] transition-colors group flex flex-col justify-center">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <h4 className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors">{trend.query}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Est. Volume: {trend.volume}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-green-500/10 text-green-400 px-2.5 py-1 rounded-md border border-green-500/20">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span className="text-xs font-bold">{trend.growth}</span>
                      </div>
                    </div>
                    {/* Progress Bar styled like Regional Analysis */}
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${trend.color} rounded-full transition-all duration-1000 ease-out`} 
                        style={{ width: `${trend.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regional Interest Map */}
        <div className="mt-12">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Regional Analysis: "Cricket World Cup"</CardTitle>
              <CardDescription className="text-gray-400">
                Advanced interest mapping by state over the past 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegionMap />
            </CardContent>
          </Card>
        </div>

        {/* Regional Trends */}
        <div className="mt-12">
          <RegionalTrends />
        </div>

        {/* Cultural Events */}
        <div className="mt-12">
          <CulturalEvents />
        </div>

        {/* Local News */}
        <div className="mt-12">
          <LocalNews />
        </div>
      </div>
    </div>
  )
}
