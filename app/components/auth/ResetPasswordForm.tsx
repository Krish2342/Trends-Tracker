"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Lock, AlertCircle, Loader2, CheckCircle, Crown, Shield, Key } from "lucide-react"

interface ResetPasswordFormProps {
  token: string
  onSuccess: () => void
  onBackToLogin: () => void
}

export function ResetPasswordForm({ token, onSuccess, onBackToLogin }: ResetPasswordFormProps) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [tokenValid, setTokenValid] = useState<boolean | null>(null)

  // Password strength validation
  const validatePassword = (password: string) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }
    return checks
  }

  const passwordChecks = validatePassword(password)
  const isPasswordValid = Object.values(passwordChecks).every(Boolean)

  // Validate token on component mount
  useEffect(() => {
    const validateToken = async () => {
      try {
        // Simulate token validation API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // For demo purposes, consider token valid if it's not empty
        // In real app, you'd validate against your backend
        if (token && token.length > 10) {
          setTokenValid(true)
        } else {
          setTokenValid(false)
        }
      } catch (err) {
        setTokenValid(false)
      }
    }

    validateToken()
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validation
    if (!password || !confirmPassword) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    if (!isPasswordValid) {
      setError("Password does not meet security requirements")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call to reset password
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In real app, you would call your password reset API here
      // await resetPassword(token, password)

      onSuccess()
    } catch (err) {
      setError("Failed to reset password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Loading state while validating token
  if (tokenValid === null) {
    return (
      <Card className="w-full max-w-md mx-auto premium-card premium-glow">
        <CardContent className="p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-400" />
          <p className="text-white">Validating reset token...</p>
        </CardContent>
      </Card>
    )
  }

  // Invalid token state
  if (!tokenValid) {
    return (
      <Card className="w-full max-w-md mx-auto premium-card premium-glow">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-red-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Invalid Reset Link</CardTitle>
          <CardDescription className="text-gray-400">
            This password reset link is invalid or has expired
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-red-950/30 rounded-lg border border-red-400/30">
            <p className="text-sm text-red-300 mb-2">Possible reasons:</p>
            <ul className="text-xs text-red-400 space-y-1">
              <li>• The link has expired (24 hour limit)</li>
              <li>• The link has already been used</li>
              <li>• The link was copied incorrectly</li>
            </ul>
          </div>

          <Button
            onClick={onBackToLogin}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-0 premium-glow"
          >
            Request New Reset Link
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto premium-card premium-glow">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Key className="h-8 w-8 text-green-400 mr-2" />
          <Crown className="h-6 w-6 text-yellow-400" />
        </div>
        <CardTitle className="text-2xl font-bold text-white premium-text-glow">Set New Password</CardTitle>
        <CardDescription className="text-gray-400">Create a strong password for your premium account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password Field */}
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-white">
              New Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="new-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                disabled={isLoading}
                autoComplete="new-password"
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

            {/* Password Strength Indicator */}
            {password && (
              <div className="space-y-2">
                <div className="text-xs text-gray-400">Password Requirements:</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div
                    className={`flex items-center gap-1 ${passwordChecks.length ? "text-green-400" : "text-red-400"}`}
                  >
                    {passwordChecks.length ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                    8+ characters
                  </div>
                  <div
                    className={`flex items-center gap-1 ${passwordChecks.uppercase ? "text-green-400" : "text-red-400"}`}
                  >
                    {passwordChecks.uppercase ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <AlertCircle className="h-3 w-3" />
                    )}
                    Uppercase letter
                  </div>
                  <div
                    className={`flex items-center gap-1 ${passwordChecks.lowercase ? "text-green-400" : "text-red-400"}`}
                  >
                    {passwordChecks.lowercase ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <AlertCircle className="h-3 w-3" />
                    )}
                    Lowercase letter
                  </div>
                  <div
                    className={`flex items-center gap-1 ${passwordChecks.number ? "text-green-400" : "text-red-400"}`}
                  >
                    {passwordChecks.number ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                    Number
                  </div>
                  <div
                    className={`flex items-center gap-1 ${passwordChecks.special ? "text-green-400" : "text-red-400"} col-span-2`}
                  >
                    {passwordChecks.special ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                    Special character (!@#$%^&*)
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-white">
              Confirm New Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-white"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {confirmPassword && (
              <div className="flex items-center gap-2 text-xs">
                {password === confirmPassword ? (
                  <CheckCircle className="h-3 w-3 text-green-400" />
                ) : (
                  <AlertCircle className="h-3 w-3 text-red-400" />
                )}
                <span className={password === confirmPassword ? "text-green-400" : "text-red-400"}>
                  {password === confirmPassword ? "Passwords match" : "Passwords do not match"}
                </span>
              </div>
            )}
          </div>

          {/* Security Notice */}
          <div className="p-3 bg-blue-950/30 rounded-lg border border-blue-400/30">
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-300">
                <p className="font-medium mb-1">Security Tips:</p>
                <ul className="space-y-1 text-blue-400">
                  <li>• Use a unique password you haven't used before</li>
                  <li>• Consider using a password manager</li>
                  <li>• Don't share your password with anyone</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-0 premium-glow"
            disabled={isLoading || !isPasswordValid || password !== confirmPassword}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating Password...
              </>
            ) : (
              <>
                <Key className="mr-2 h-4 w-4" />
                Update Password
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
