"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
}

interface StoredUser extends User {
  passwordHash: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isAuthenticated: boolean
  requestPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>
  resetPassword: (token: string, newPassword: string) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Storage keys
const USERS_KEY = "trends-users"
const SESSION_KEY = "trends-user"
const RESET_TOKENS_KEY = "trends-reset-tokens"

// Simple hash function for passwords (not cryptographic — use bcrypt on server in production)
function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return `h_${Math.abs(hash).toString(36)}_${str.length}`
}

// Persistent storage helpers
function getStoredUsers(): StoredUser[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(USERS_KEY)
    if (!raw) {
      // Seed the default demo user on first load
      const demo: StoredUser = {
        id: "demo-001",
        email: "demo@example.com",
        passwordHash: simpleHash("password123"),
        name: "Demo User",
        avatar: "https://avatar.vercel.sh/demo",
        createdAt: "2024-01-01T00:00:00Z",
      }
      localStorage.setItem(USERS_KEY, JSON.stringify([demo]))
      return [demo]
    }
    return JSON.parse(raw) as StoredUser[]
  } catch {
    return []
  }
}

function saveStoredUsers(users: StoredUser[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

interface ResetToken {
  email: string
  expires: number
}

function getResetTokens(): Record<string, ResetToken> {
  if (typeof window === "undefined") return {}
  try {
    const raw = localStorage.getItem(RESET_TOKENS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveResetTokens(tokens: Record<string, ResetToken>): void {
  if (typeof window === "undefined") return
  localStorage.setItem(RESET_TOKENS_KEY, JSON.stringify(tokens))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Restore session on app start
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(SESSION_KEY)
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch {
      localStorage.removeItem(SESSION_KEY)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      const users = getStoredUsers()
      const found = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === simpleHash(password)
      )

      if (!found) {
        return { success: false, error: "Invalid email or password" }
      }

      const sessionUser: User = {
        id: found.id,
        email: found.email,
        name: found.name,
        avatar: found.avatar,
        createdAt: found.createdAt,
      }

      setUser(sessionUser)
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser))
      return { success: true }
    } catch {
      return { success: false, error: "Login failed. Please try again." }
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      const users = getStoredUsers()
      const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
      if (exists) {
        return { success: false, error: "An account with this email already exists" }
      }

      const newUser: StoredUser = {
        id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        email,
        passwordHash: simpleHash(password),
        name,
        avatar: `https://avatar.vercel.sh/${encodeURIComponent(name)}`,
        createdAt: new Date().toISOString(),
      }

      users.push(newUser)
      saveStoredUsers(users)

      const sessionUser: User = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        avatar: newUser.avatar,
        createdAt: newUser.createdAt,
      }

      setUser(sessionUser)
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser))
      return { success: true }
    } catch {
      return { success: false, error: "Signup failed. Please try again." }
    }
  }

  const requestPasswordReset = async (email: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const users = getStoredUsers()
      const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

      // Always return success for security (don't reveal if email exists)
      if (!found) return { success: true }

      const token = `rst_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 11)}`
      const expires = Date.now() + 24 * 60 * 60 * 1000 // 24 hours

      const tokens = getResetTokens()
      tokens[token] = { email: found.email, expires }
      saveResetTokens(tokens)

      // In production: send email. For demo, log to console.
      console.info(`[Password Reset] Token for ${email}: /reset-password?token=${token}`)
      return { success: true }
    } catch {
      return { success: false, error: "Failed to send reset email. Please try again." }
    }
  }

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const tokens = getResetTokens()
      const tokenData = tokens[token]

      if (!tokenData || tokenData.expires < Date.now()) {
        return { success: false, error: "Invalid or expired reset link. Please request a new one." }
      }

      const users = getStoredUsers()
      const idx = users.findIndex((u) => u.email.toLowerCase() === tokenData.email.toLowerCase())
      if (idx === -1) {
        return { success: false, error: "Account not found." }
      }

      users[idx].passwordHash = simpleHash(newPassword)
      saveStoredUsers(users)

      // Invalidate the used token
      delete tokens[token]
      saveResetTokens(tokens)

      return { success: true }
    } catch {
      return { success: false, error: "Failed to reset password. Please try again." }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(SESSION_KEY)
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    requestPasswordReset,
    resetPassword,
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
