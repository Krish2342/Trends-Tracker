"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

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
  logout: () => void
  isAuthenticated: boolean
  requestPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>
  resetPassword: (token: string, newPassword: string) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user storage (in real app, this would be a database)
const MOCK_USERS = [
  {
    id: "1",
    email: "demo@example.com",
    password: "password123",
    name: "Demo User",
    avatar: "https://avatar.vercel.sh/demo",
    createdAt: "2024-01-01T00:00:00Z",
  },
]

// Mock password reset tokens (in real app, this would be stored securely)
const MOCK_RESET_TOKENS: Record<string, { email: string; expires: number }> = {}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in on app start
  useEffect(() => {
    const savedUser = localStorage.getItem("trends-user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem("trends-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user exists (in real app, this would be a server call)
      const foundUser = MOCK_USERS.find((u) => u.email === email && u.password === password)

      if (!foundUser) {
        return { success: false, error: "Invalid email or password" }
      }

      const userWithoutPassword = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        avatar: foundUser.avatar,
        createdAt: foundUser.createdAt,
      }

      setUser(userWithoutPassword)
      localStorage.setItem("trends-user", JSON.stringify(userWithoutPassword))

      return { success: true }
    } catch (error) {
      return { success: false, error: "Login failed. Please try again." }
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user already exists
      const existingUser = MOCK_USERS.find((u) => u.email === email)
      if (existingUser) {
        return { success: false, error: "User with this email already exists" }
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        name,
        avatar: `https://avatar.vercel.sh/${name}`,
        createdAt: new Date().toISOString(),
      }

      // Add to mock database
      MOCK_USERS.push(newUser)

      const userWithoutPassword = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        avatar: newUser.avatar,
        createdAt: newUser.createdAt,
      }

      setUser(userWithoutPassword)
      localStorage.setItem("trends-user", JSON.stringify(userWithoutPassword))

      return { success: true }
    } catch (error) {
      return { success: false, error: "Signup failed. Please try again." }
    }
  }

  const requestPasswordReset = async (email: string) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Check if user exists
      const foundUser = MOCK_USERS.find((u) => u.email === email)
      if (!foundUser) {
        // For security, don't reveal if email exists or not
        return { success: true }
      }

      // Generate reset token (in real app, this would be cryptographically secure)
      const token = `reset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const expires = Date.now() + 24 * 60 * 60 * 1000 // 24 hours

      // Store reset token
      MOCK_RESET_TOKENS[token] = { email, expires }

      // In real app, you would send email here
      console.log(`Password reset link: /reset-password?token=${token}`)

      return { success: true }
    } catch (error) {
      return { success: false, error: "Failed to send reset email. Please try again." }
    }
  }

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Validate token
      const resetData = MOCK_RESET_TOKENS[token]
      if (!resetData || resetData.expires < Date.now()) {
        return { success: false, error: "Invalid or expired reset token" }
      }

      // Find user and update password
      const userIndex = MOCK_USERS.findIndex((u) => u.email === resetData.email)
      if (userIndex === -1) {
        return { success: false, error: "User not found" }
      }

      // Update password
      MOCK_USERS[userIndex].password = newPassword

      // Remove used token
      delete MOCK_RESET_TOKENS[token]

      return { success: true }
    } catch (error) {
      return { success: false, error: "Failed to reset password. Please try again." }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("trends-user")
  }

  const value = {
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
