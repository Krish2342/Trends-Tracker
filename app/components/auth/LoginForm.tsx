"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock, AlertCircle, Loader2, Crown } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"

interface LoginFormProps {
  onSwitchToSignup: () => void
  onForgotPassword: () => void
}

export function LoginForm({ onSwitchToSignup, onForgotPassword }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!email || !password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    try {
      const result = await login(email, password)
      if (!result.success) {
        setError(result.error || "Login failed")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto premium-card premium-glow">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Crown className="h-8 w-8 text-yellow-400 mr-2" />
          <span className="text-lg font-bold text-white">PREMIUM ACCESS</span>
        </div>
        <CardTitle className="text-2xl font-bold text-white premium-text-glow">Welcome Back</CardTitle>
        <CardDescription className="text-gray-400">Sign in to access India Trends Tracker Premium</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-white"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              disabled={isLoading}
            >
              Forgot Password?
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-0 premium-glow"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Access Premium Dashboard"
            )}
          </Button>

          {/* Demo Credentials */}
          <div className="p-3 bg-blue-950/30 rounded-lg border border-blue-400/30">
            <p className="text-sm text-blue-300 mb-2 font-medium">Demo Premium Access:</p>
            <p className="text-xs text-blue-400">
              Email: demo@example.com
              <br />
              Password: password123
            </p>
          </div>

          {/* Switch to Signup */}
          <div className="text-center">
            <p className="text-sm text-gray-400">
              Don't have premium access?{" "}
              <button
                type="button"
                onClick={onSwitchToSignup}
                className="text-blue-400 font-medium hover:text-blue-300 transition-colors"
                disabled={isLoading}
              >
                Get Premium
              </button>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
