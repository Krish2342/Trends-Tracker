"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { supabase } from "@/lib/supabase"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  loginWithOAuth: (provider: 'google' | 'github', redirectTo?: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isAuthenticated: boolean
  getAccessToken: () => Promise<string | null>
  requestPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>
  resetPassword: (password: string) => Promise<{ success: boolean; error?: string }>
  searchHistory: string[]
  favorites: string[]
  addSearchHistory: (term: string) => void
  clearSearchHistory: () => void
  toggleFavorite: (term: string) => void
  updateUserProfile: (name: string, avatarUrl?: string) => Promise<{ success: boolean; error?: string }>
  updateUserPassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])

  const mapSupabaseUser = (su: SupabaseUser): User => {
    return {
      id: su.id,
      email: su.email || "",
      name: su.user_metadata?.name || su.user_metadata?.full_name || "User",
      avatar: su.user_metadata?.avatar_url || `https://avatar.vercel.sh/${encodeURIComponent(su.email || 'user')}`,
      createdAt: su.created_at,
    }
  }

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(mapSupabaseUser(session.user))
      }
      setIsLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(mapSupabaseUser(session.user))
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message || "Login failed" }
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      })
      if (error) throw error
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message || "Signup failed" }
    }
  }

  const loginWithOAuth = async (provider: 'google' | 'github', redirectTo?: string) => {
    try {
      // Build the redirect URL: after OAuth, Supabase redirects here
      let callbackUrl = typeof window !== 'undefined' ? window.location.origin : undefined
      if (redirectTo && callbackUrl) {
        callbackUrl = `${callbackUrl}${redirectTo}`
      }
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: callbackUrl
        }
      })
      if (error) throw error
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message || `${provider} login failed` }
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const requestPasswordReset = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/reset-password` : undefined,
      })
      if (error) throw error
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to send reset email" }
    }
  }

  const resetPassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to reset password" }
    }
  }

  useEffect(() => {
    if (user) {
      const storedHistory = localStorage.getItem(`trends-history-${user.id}`)
      setSearchHistory(storedHistory ? JSON.parse(storedHistory) : [])
      const storedFavorites = localStorage.getItem(`trends-favorites-${user.id}`)
      setFavorites(storedFavorites ? JSON.parse(storedFavorites) : ["Cricket", "IPL", "Bollywood", "Technology"])
    } else {
      setSearchHistory([])
      setFavorites([])
    }
  }, [user])

  const addSearchHistory = (term: string) => {
    if (!user || !term.trim()) return
    const normalized = term.trim()
    setSearchHistory((prev) => {
      const filtered = prev.filter((t) => t.toLowerCase() !== normalized.toLowerCase())
      const updated = [normalized, ...filtered].slice(0, 8)
      localStorage.setItem(`trends-history-${user.id}`, JSON.stringify(updated))
      return updated
    })
  }

  const clearSearchHistory = () => {
    if (!user) return
    setSearchHistory([])
    localStorage.removeItem(`trends-history-${user.id}`)
  }

  const toggleFavorite = (term: string) => {
    if (!user || !term.trim()) return
    const normalized = term.trim()
    setFavorites((prev) => {
      let updated
      if (prev.some((f) => f.toLowerCase() === normalized.toLowerCase())) {
        updated = prev.filter((f) => f.toLowerCase() !== normalized.toLowerCase())
      } else {
        updated = [normalized, ...prev]
      }
      localStorage.setItem(`trends-favorites-${user.id}`, JSON.stringify(updated))
      return updated
    })
  }

  const updateUserProfile = async (name: string, avatarUrl?: string) => {
    if (!user) return { success: false, error: "Not authenticated" }
    try {
      const { error } = await supabase.auth.updateUser({
        data: { name, avatar_url: avatarUrl }
      })
      if (error) throw error
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to update profile" }
    }
  }

  const updateUserPassword = async (currentPassword: string, newPassword: string) => {
    if (!user) return { success: false, error: "Not authenticated" }
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword })
      if (error) throw error
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to update password" }
    }
  }

  // Get the current Supabase access token for authenticated API calls
  const getAccessToken = async (): Promise<string | null> => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      return session?.access_token || null
    } catch {
      return null
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    loginWithOAuth,
    logout,
    isAuthenticated: !!user,
    getAccessToken,
    requestPasswordReset,
    resetPassword,
    searchHistory,
    favorites,
    addSearchHistory,
    clearSearchHistory,
    toggleFavorite,
    updateUserProfile,
    updateUserPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
