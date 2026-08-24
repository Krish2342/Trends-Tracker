"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { useAuth } from "../contexts/AuthContext"

interface ProtectedRouteProps {
  children: React.ReactNode
}

function LoadingSkeleton() {
  return (
    <div className="flex-1 bg-black">
      {/* Skeleton hero */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto space-y-6 animate-pulse">
          <div className="h-6 w-36 bg-white/10 rounded-full mx-auto" />
          <div className="h-12 w-3/4 bg-white/10 rounded-xl mx-auto" />
          <div className="h-12 w-1/2 bg-white/10 rounded-xl mx-auto" />
          <div className="h-14 max-w-2xl mx-auto bg-white/10 rounded-lg" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-36 bg-white/5 rounded-xl border border-white/10" />
            ))}
          </div>
        </div>

        {/* Skeleton content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          <div className="lg:col-span-2 h-80 bg-white/5 rounded-xl border border-white/10 animate-pulse" />
          <div className="h-80 bg-white/5 rounded-xl border border-white/10 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading || !isAuthenticated) {
    return <LoadingSkeleton />
  }

  return <>{children}</>
}
