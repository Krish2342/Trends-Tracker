"use client"

import { useAuth } from "../../contexts/AuthContext"
import { AuthModal } from "./AuthModal"
import { X } from "lucide-react"

export function GlobalAuthModal() {
  const { isAuthModalOpen, closeAuthModal } = useAuth()

  if (!isAuthModalOpen) return null

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 pointer-events-none"></div>
      <div className="w-full max-w-md relative z-[1000] animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute right-4 top-4 text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors z-50"
        >
          <X className="w-5 h-5" />
        </button>
        <AuthModal isInline={false} />
      </div>
    </div>
  )
}
