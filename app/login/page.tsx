import { LoginForm } from "@/app/components/auth/LoginForm"
import Link from "next/link"
import { TrendingUp } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full mix-blend-screen filter blur-[128px] animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full mix-blend-screen filter blur-[128px] animate-blob animation-delay-2000" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link href="/" className="flex justify-center items-center space-x-2 group mb-8">
          <div className="relative">
            <TrendingUp className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
            <div className="absolute inset-0 bg-blue-400/20 blur-lg rounded-full group-hover:bg-blue-300/30 transition-all"></div>
          </div>
          <span className="font-bold text-3xl text-white text-glow">
            India TrendsTracker
          </span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <LoginForm />
      </div>
    </div>
  )
}
