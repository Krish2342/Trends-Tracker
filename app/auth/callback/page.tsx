"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

function AuthCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true

    const completeSignIn = async () => {
      const authError = searchParams.get("error_description") || searchParams.get("error")
      if (authError) {
        if (active) setError(authError.replace(/\+/g, " "))
        return
      }

      const code = searchParams.get("code")
      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
        if (exchangeError) {
          if (active) setError(exchangeError.message)
          return
        }
      } else {
        const hash = new URLSearchParams(window.location.hash.slice(1))
        const accessToken = hash.get("access_token")
        const refreshToken = hash.get("refresh_token")

        if (accessToken && refreshToken) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          })
          if (sessionError) {
            if (active) setError(sessionError.message)
            return
          }
        }
      }

      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) {
        if (active) setError(sessionError.message)
        return
      }
      if (!session) {
        if (active) setError("No authenticated session was returned. Please try again.")
        return
      }

      const nextPath = searchParams.get("next")
      window.location.replace(nextPath?.startsWith("/") ? nextPath : "/")
    }

    completeSignIn()
    return () => {
      active = false
    }
  }, [router, searchParams])

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-semibold text-white">Authentication failed</h1>
          <p className="mt-3 text-sm text-red-400">{error}</p>
          <a className="mt-6 inline-block text-blue-400 hover:text-blue-300" href="/login">
            Return to login
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center text-white">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-400" />
        <p className="mt-4">Completing sign in...</p>
      </div>
    </main>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={null}>
      <AuthCallbackContent />
    </Suspense>
  )
}
