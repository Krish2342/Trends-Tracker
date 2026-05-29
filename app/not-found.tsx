"use client"

import Link from "next/link"
import { TrendingUp, Home, Search, BarChart3, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden bg-black">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-black to-purple-950/20 pointer-events-none" />

      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Animated icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/10 flex items-center justify-center app-glow-animate">
              <TrendingUp className="w-10 h-10 text-blue-400" />
            </div>
            <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-red-500/80 flex items-center justify-center text-white text-xs font-bold border-2 border-black">
              !
            </div>
          </div>
        </div>

        {/* 404 heading */}
        <p className="text-8xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text mb-4 leading-none">
          404
        </p>
        <h1 className="text-2xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-gray-400 mb-10 leading-relaxed">
          Looks like this trend has faded away. The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-0 app-glow">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/5">
            <Link href="/search">
              <Search className="w-4 h-4 mr-2" />
              Search Trends
            </Link>
          </Button>
          <Button asChild variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/5">
            <Link href="/explore">
              <BarChart3 className="w-4 h-4 mr-2" />
              Explore
            </Link>
          </Button>
        </div>

        {/* Quick nav links */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-sm text-gray-500 mb-4">Popular pages</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {[
              { label: "Search", href: "/search" },
              { label: "Compare", href: "/compare" },
              { label: "Real-Time", href: "/realtime" },
              { label: "Explore", href: "/explore" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-blue-400"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
