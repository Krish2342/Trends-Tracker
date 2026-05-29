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
  const { isAuthenticated, openAuthModal } = useAuth()

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
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <TrendingUp className="h-6 w-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
              <div className="absolute inset-0 bg-blue-400/20 blur-lg rounded-full group-hover:bg-blue-300/30 transition-all"></div>
            </div>
            <span className="font-bold text-xl text-white text-glow">
              India TrendsTracker
            </span>
          </Link>

          {/* Desktop Navigation - Always shown */}
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

          {/* Search Bar - Always shown, guest searches trigger login modal */}
          <div className="hidden lg:flex items-center w-full max-w-sm ml-4 poda">
            <div className="search-glow"></div>
            <div className="search-darkBorderBg"></div>
            <div className="search-white"></div>
            <div className="search-border"></div>
            
            <div id="main" className="flex w-full relative z-10 bg-[#010201] rounded-lg p-[1px]">
              <Input
                type="text"
                placeholder="Search trends..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full bg-[#010201] border-0 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none rounded-r-none h-10"
              />
              <div id="pink-mask"></div>
              <Button
                size="sm"
                onClick={handleSearch}
                className="h-10 px-4 rounded-l-none rounded-r-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-0 relative z-20 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right Side - User Profile/Sign In / Mobile Menu */}
          <div className="flex items-center space-x-2">
            {/* Desktop User Profile or Sign In */}
            {isAuthenticated ? (
              <div className="hidden md:block">
                <UserProfile />
              </div>
            ) : (
              <Button
                onClick={() => openAuthModal()}
                className="hidden md:flex bg-blue-600 hover:bg-blue-500 text-white border-0 app-glow-animate font-medium text-sm"
              >
                Sign In
              </Button>
            )}

            {/* Mobile Menu for all users */}
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

                  {/* Mobile Profile / Sign In */}
                  <div className="pt-4 border-t border-white/10">
                    {isAuthenticated ? (
                      <UserProfile />
                    ) : (
                      <Button
                        onClick={() => {
                          setIsOpen(false)
                          openAuthModal()
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white border-0 app-glow-animate"
                      >
                        Sign In
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>

  )
}
