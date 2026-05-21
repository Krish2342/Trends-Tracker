"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Shield, ArrowRight } from "lucide-react"

interface PasswordResetSuccessProps {
  onBackToLogin: () => void
}

export function PasswordResetSuccess({ onBackToLogin }: PasswordResetSuccessProps) {
  return (
    <Card className="w-full max-w-md mx-auto glass-card app-glow">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <CheckCircle className="h-16 w-16 text-green-400" />
            <div className="absolute inset-0 bg-green-400/20 blur-lg rounded-full"></div>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-white text-glow">Password Updated!</CardTitle>
        <CardDescription className="text-gray-400">
          Your account password has been successfully updated
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Success Message */}
        <div className="p-4 bg-green-950/30 rounded-lg border border-green-400/30">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-5 w-5 text-green-400" />
            <span className="text-sm font-medium text-green-300">Security Update Complete</span>
          </div>
          <ul className="text-sm text-green-400 space-y-1">
            <li>• Your password has been securely updated</li>
            <li>• All active sessions have been logged out</li>
            <li>• Your account is now protected</li>
          </ul>
        </div>

        {/* Features Reminder */}
        <div className="p-4 bg-blue-950/30 rounded-lg border border-blue-400/30">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Account Secured</span>
          </div>
          <p className="text-sm text-blue-400">
            Your account data remains fully protected with your new password.
          </p>
        </div>

        {/* Next Steps */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-white">What's Next?</h4>
          <ul className="text-sm text-gray-400 space-y-2">
            <li className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <span>Sign in with your new password</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <span>Update your password manager</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <span>Continue exploring trends</span>
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <Button
          onClick={onBackToLogin}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-0 app-glow"
        >
          <ArrowRight className="w-4 h-4 mr-2" />
          Sign In with New Password
        </Button>

        {/* Security Tip */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            💡 Tip: Consider enabling two-factor authentication for enhanced security
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
