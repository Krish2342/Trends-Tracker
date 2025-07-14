"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { ResetPasswordForm } from "../components/auth/ResetPasswordForm"
import { PasswordResetSuccess } from "../components/auth/PasswordResetSuccess"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const [showSuccess, setShowSuccess] = useState(false)
  const token = searchParams.get("token") || ""

  const handleSuccess = () => {
    setShowSuccess(true)
  }

  const handleBackToLogin = () => {
    window.location.href = "/"
  }

  if (showSuccess) {
    return <PasswordResetSuccess onBackToLogin={handleBackToLogin} />
  }

  return <ResetPasswordForm token={token} onSuccess={handleSuccess} onBackToLogin={handleBackToLogin} />
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
      <div className="w-full max-w-md relative z-10">
        <Suspense
          fallback={
            <Card className="w-full max-w-md mx-auto premium-card premium-glow">
              <CardContent className="p-8 text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-400" />
                <p className="text-white">Loading...</p>
              </CardContent>
            </Card>
          }
        >
          <ResetPasswordContent />
        </Suspense>
      </div>
    </div>
  )
}
