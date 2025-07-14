"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserProfile } from "./UserProfile"
import { Search, Menu, TrendingUp, BarChart3, Clock, Globe, Zap } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "../contexts/AuthContext"

export function Header() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated } = useAuth()

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

  const navigation = [
    { name: "Search Trends", href: "/search", icon: Search },
    { name: "Compare", href: "/compare", icon: BarChart3 },
    { name: "Real-Time", href: "/realtime", icon: Clock },
    { name: "Explore", href: "/explore", icon: Globe },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Premium Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <TrendingUp className="h-6 w-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
              <div className="absolute inset-0 bg-blue-400/20 blur-lg rounded-full group-hover:bg-blue-300/30 transition-all"></div>
            </div>
            <span className="font-bold text-xl text-white premium-text-glow">
              India TrendsTracker
              <span className="text-blue-400 text-xs ml-2 font-normal">PREMIUM</span>
            </span>
          </Link>

          {/* Desktop Navigation - Only show if authenticated */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-1 text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors group"
                >
                  <item.icon className="h-4 w-4 group-hover:text-blue-400" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          )}

          {/* Premium Search Bar - Only show if authenticated */}
          {isAuthenticated && (
            <div className="hidden lg:flex items-center space-x-2 max-w-sm">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search trends..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-md pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
              </div>
              <Button
                size="sm"
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-500 text-white border-0 premium-glow-animate"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Right Side - User Profile/Mobile Menu */}
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                {/* Premium Badge */}
                <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full border border-blue-400/30">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs text-blue-300 font-medium">PREMIUM</span>
                </div>

                {/* User Profile - Desktop */}
                <div className="hidden md:block">
                  <UserProfile />
                </div>

                {/* Mobile Menu - Authenticated */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild className="md:hidden">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80 bg-black border-white/10">
                    <div className="flex flex-col space-y-4 mt-8">
                      {/* Mobile Search */}
                      <div className="flex space-x-2">
                        <Input
                          type="text"
                          placeholder="Search trends..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onKeyDown={handleKeyPress}
                          className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                        />
                        <Button size="sm" onClick={handleSearch} className="bg-blue-600 hover:bg-blue-500">
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Mobile Navigation */}
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center space-x-3 text-lg font-medium py-2 text-white hover:text-blue-400 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </Link>
                      ))}

                      {/* Mobile User Profile */}
                      <div className="pt-4 border-t border-white/10">
                        <UserProfile />
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </>
            ) : (
              // Show minimal header for non-authenticated users
              <div className="text-sm text-gray-400">Please sign in to access premium features</div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
