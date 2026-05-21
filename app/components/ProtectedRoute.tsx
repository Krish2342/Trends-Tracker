"use client"

import type React from "react"

import { useAuth } from "../contexts/AuthContext"
import { AuthModal } from "./auth/AuthModal"

interface ProtectedRouteProps {
  children: React.ReactNode
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-black">
      {/* Skeleton header space */}
      <div className="h-16 border-b border-white/10" />

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

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (!isAuthenticated) {
    return <AuthModal />
  }

  return <>{children}</>
}
