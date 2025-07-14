"use client"

import { useState } from "react"
import { LoginForm } from "./LoginForm"
import { SignupForm } from "./SignupForm"
import { ForgotPasswordForm } from "./ForgotPasswordForm"
import { ResetPasswordForm } from "./ResetPasswordForm"
import { PasswordResetSuccess } from "./PasswordResetSuccess"

type AuthMode = "login" | "signup" | "forgot-password" | "reset-password" | "reset-success"

export function AuthModal() {
  const [mode, setMode] = useState<AuthMode>("login")
  const [resetToken, setResetToken] = useState("")

  // In a real app, you'd get the reset token from URL params
  // For demo purposes, we'll simulate it
  const handleForgotPassword = () => {
    setMode("forgot-password")
  }

  const handleBackToLogin = () => {
    setMode("login")
  }

  const handleResetPassword = (token: string) => {
    setResetToken(token)
    setMode("reset-password")
  }

  const handleResetSuccess = () => {
    setMode("reset-success")
  }

  const renderForm = () => {
    switch (mode) {
      case "login":
        return <LoginForm onSwitchToSignup={() => setMode("signup")} onForgotPassword={handleForgotPassword} />
      case "signup":
        return <SignupForm onSwitchToLogin={() => setMode("login")} />
      case "forgot-password":
        return <ForgotPasswordForm onBackToLogin={handleBackToLogin} />
      case "reset-password":
        return <ResetPasswordForm token={resetToken} onSuccess={handleResetSuccess} onBackToLogin={handleBackToLogin} />
      case "reset-success":
        return <PasswordResetSuccess onBackToLogin={handleBackToLogin} />
      default:
        return <LoginForm onSwitchToSignup={() => setMode("signup")} onForgotPassword={handleForgotPassword} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
      <div className="w-full max-w-md relative z-10">{renderForm()}</div>
    </div>
  )
}
