"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowLeft, AlertCircle, Loader2, CheckCircle, Crown, Shield } from "lucide-react"

interface ForgotPasswordFormProps {
  onBackToLogin: () => void
}

export function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Basic validation
    if (!email) {
      setError("Please enter your email address")
      setIsLoading(false)
      return
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, you would call your password reset API here
      // For demo purposes, we'll just show success
      setSuccess(true)
    } catch (err) {
      setError("Failed to send reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="w-full max-w-md mx-auto premium-card premium-glow">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-white premium-text-glow">Check Your Email</CardTitle>
          <CardDescription className="text-gray-400">
            We've sent password reset instructions to your email
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-green-950/30 rounded-lg border border-green-400/30">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="h-5 w-5 text-green-400" />
              <span className="text-sm font-medium text-green-300">Email Sent Successfully</span>
            </div>
            <p className="text-sm text-green-400 mb-2">We've sent a password reset link to:</p>
            <p className="text-sm font-mono text-white bg-black/30 px-3 py-2 rounded">{email}</p>
          </div>

          <div className="space-y-3 text-sm text-gray-400">
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <span>Click the link in your email to reset your password securely</span>
            </div>
            <div className="flex items-start gap-2">
              <Crown className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>The reset link will expire in 24 hours for security</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={onBackToLogin}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-0 premium-glow"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Didn't receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => {
                    setSuccess(false)
                    setEmail("")
                  }}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  try again
                </button>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto premium-card premium-glow">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Shield className="h-8 w-8 text-blue-400 mr-2" />
          <Crown className="h-6 w-6 text-yellow-400" />
        </div>
        <CardTitle className="text-2xl font-bold text-white premium-text-glow">Reset Password</CardTitle>
        <CardDescription className="text-gray-400">
          Enter your email to receive password reset instructions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="reset-email" className="text-white">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="reset-email"
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                disabled={isLoading}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Security Notice */}
          <div className="p-3 bg-blue-950/30 rounded-lg border border-blue-400/30">
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-300">
                <p className="font-medium mb-1">Security Notice:</p>
                <ul className="space-y-1 text-blue-400">
                  <li>• Reset link expires in 24 hours</li>
                  <li>• Only works for registered premium accounts</li>
                  <li>• Check spam folder if not received</li>
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
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Reset Link...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Send Reset Link
              </>
            )}
          </Button>

          {/* Back to Login */}
          <div className="text-center">
            <button
              type="button"
              onClick={onBackToLogin}
              className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center justify-center gap-1 mx-auto"
              disabled={isLoading}
            >
              <ArrowLeft className="w-3 h-3" />
              Back to Login
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
