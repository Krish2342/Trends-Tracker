"use client"
import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// If the Input component exists elsewhere, update the import path accordingly, for example:
import { Input } from "../components/ui/input"
// Or, if the file does not exist, create it at app/components/ui/input.tsx with a basic Input component like below:

// import { Input } from "../components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, Globe, BarChart3, Clock, Shield, Zap, Star, Crown } from "lucide-react"
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
  const [trendingSearches, setTrendingSearches] = useState([
    "IPL 2024",
    "Bollywood Movies",
    "Diwali Celebrations",
    "Mumbai Weather",
    "Indian Elections",
  ])

  const { user } = useAuth()

  const handleSearch = () => {
    if (searchTerm.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchTerm.trim())}`
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Premium Welcome Section for Authenticated Users */}
      {user && (
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-b border-white/10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center premium-glow">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white premium-text-glow">Welcome back, {user.name}! 👑</h2>
                <p className="text-gray-300">Premium access to India's trending data insights</p>
              </div>
              <div className="ml-auto hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-full border border-yellow-400/30">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-yellow-300 font-medium">PREMIUM MEMBER</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Premium Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 mb-4 premium-glow">
                <Zap className="w-3 h-3 mr-1" />
                PREMIUM ANALYTICS PLATFORM
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 premium-text-glow">
              Explore What India is{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Searching
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Premium real-time analytics • Exclusive insights • Advanced trending data from across India
            </p>

            {/* Premium Search Bar */}
            <div className="flex max-w-2xl mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-lg"></div>
              <Input
                type="text"
                placeholder="Enter a search term for premium insights..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                className="text-lg py-6 rounded-r-none bg-white/5 border-white/20 text-white placeholder:text-gray-400 relative z-10"
              />
              <Button
                onClick={handleSearch}
                className="px-8 py-6 rounded-l-none bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-0 relative z-10 premium-glow"
                size="lg"
              >
                <Search className="w-5 h-5" />
              </Button>
            </div>

            {/* Premium Trending Searches */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <span className="text-sm text-gray-400 mr-2">🔥 Trending in India:</span>
              {trendingSearches.map((term, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-600 hover:text-white transition-all border-white/20 text-gray-300 hover:border-blue-400 premium-glow"
                  onClick={() => setSearchTerm(term)}
                >
                  {term}
                </Badge>
              ))}
            </div>

            {/* Premium Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card className="premium-card premium-glow-animate">
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 mx-auto mb-4 text-green-400" />
                  <h3 className="font-semibold mb-2 text-white">Premium Security</h3>
                  <p className="text-sm text-gray-400">Enterprise-grade protection and exclusive access</p>
                </CardContent>
              </Card>

              <Card className="premium-card premium-glow-animate">
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 mx-auto mb-4 text-yellow-400" />
                  <h3 className="font-semibold mb-2 text-white">Real-Time Intelligence</h3>
                  <p className="text-sm text-gray-400">Live data with millisecond precision updates</p>
                </CardContent>
              </Card>

              <Card className="premium-card premium-glow-animate">
                <CardContent className="p-6 text-center">
                  <Crown className="w-8 h-8 mx-auto mb-4 text-purple-400" />
                  <h3 className="font-semibold mb-2 text-white">Exclusive Analytics</h3>
                  <p className="text-sm text-gray-400">Advanced insights unavailable elsewhere</p>
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
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  Featured Premium Trend: "Cricket World Cup"
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 text-xs">
                    LIVE
                  </Badge>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Real-time search interest over the past 12 months in India
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DynamicTrendChart searchTerm="Cricket World Cup" />
              </CardContent>
            </Card>
          </div>

          {/* Trending Topics */}
          <div>
            <TrendingTopics />
          </div>
        </div>

        {/* Premium Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <Link href="/search">
            <Card className="premium-card hover:premium-glow transition-all cursor-pointer group">
              <CardContent className="p-6 text-center">
                <Search className="w-8 h-8 mx-auto mb-4 text-blue-400 group-hover:text-blue-300" />
                <h3 className="font-semibold mb-2 text-white">Premium Search</h3>
                <p className="text-sm text-gray-400">Advanced trend analysis with AI insights</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/compare">
            <Card className="premium-card hover:premium-glow transition-all cursor-pointer group">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-8 h-8 mx-auto mb-4 text-green-400 group-hover:text-green-300" />
                <h3 className="font-semibold mb-2 text-white">Smart Compare</h3>
                <p className="text-sm text-gray-400">Compare up to 10 terms with premium analytics</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/realtime">
            <Card className="premium-card hover:premium-glow transition-all cursor-pointer group">
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 mx-auto mb-4 text-red-400 group-hover:text-red-300" />
                <h3 className="font-semibold mb-2 text-white">Live Intelligence</h3>
                <p className="text-sm text-gray-400">Real-time data with instant notifications</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/explore">
            <Card className="premium-card hover:premium-glow transition-all cursor-pointer group">
              <CardContent className="p-6 text-center">
                <Globe className="w-8 h-8 mx-auto mb-4 text-purple-400 group-hover:text-purple-300" />
                <h3 className="font-semibold mb-2 text-white">Regional Insights</h3>
                <p className="text-sm text-gray-400">Exclusive regional data and predictions</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Regional Interest Map */}
        <div className="mt-12">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-white">Premium Regional Analysis: "Cricket World Cup"</CardTitle>
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
