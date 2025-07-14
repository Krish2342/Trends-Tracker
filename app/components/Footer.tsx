import Link from "next/link"
import {
  TrendingUp,
  Github,
  Linkedin,
  Instagram,
  Crown,
  Zap,
  X,
} from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Premium Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <TrendingUp className="h-6 w-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <div className="absolute inset-0 bg-blue-400/20 blur-lg rounded-full group-hover:bg-blue-300/30 transition-all"></div>
              </div>
              <span className="font-bold text-xl text-white premium-text-glow">TrendsTracker</span>
              <Crown className="h-4 w-4 text-yellow-400" />
            </Link>
            <p className="text-sm text-gray-400">
               analytics platform for exploring trending topics and search data across India.
            </p>
            <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full border border-blue-400/30 w-fit">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span className="text-xs text-blue-300 font-medium"> EDITION</span>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white"> Features</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/search" className="hover:text-blue-400 transition-colors">
                  Advanced Search Trends
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-blue-400 transition-colors">
                  Smart Keyword Compare
                </Link>
              </li>
              <li>
                <Link href="/realtime" className="hover:text-blue-400 transition-colors">
                  Real-Time Intelligence
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-blue-400 transition-colors">
                  Regional Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About 
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-blue-400 transition-colors">
                  Premium Support
                </Link>
              </li>
              <li>
                <Link href="/api" className="hover:text-blue-400 transition-colors">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Connect</h3>
            <div className="flex space-x-4">
              <Link href="https://github.com/Krish2342" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://x.com/krishh2304?t=W64Fyjp518hhB0luIx5tNQ&s=09" className="text-gray-400 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </Link>
              <Link href="https://www.linkedin.com/in/krish-p-b15609335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/__krishh_23?igsh=MTNxNXU4aTJjY2kyag==" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
            <div className="text-xs text-gray-500">
              <p> subscribers get priority support</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 TrendsTracker. All rights reserved. | Exclusive Analytics Platform</p>
        </div>
      </div>
    </footer>
  )
}
