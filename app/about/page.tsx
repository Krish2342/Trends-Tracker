import { TrendingUp, Globe, Users, Zap, Shield, Target } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl animate-in fade-in duration-500">
      
      {/* Hero Section */}
      <div className="text-center mb-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="flex justify-center mb-6">
          <div className="relative">
            <TrendingUp className="h-16 w-16 text-blue-400" />
            <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full"></div>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">About TrendsTracker</h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          The premier real-time search trends and analytics platform built specifically for the Indian ecosystem. We process billions of data points to deliver actionable insights instantly.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 shadow-xl mb-16 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] pointer-events-none group-hover:bg-purple-500/10 transition-colors duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              We believe that data should be democratized. TrendsTracker was born out of a necessity to provide localized, deeply contextual search analytics for India. In a fast-paced digital economy, understanding what captures the public's attention is the key to creating relevant content, building better products, and making informed business decisions.
            </p>
            <p className="text-gray-400 leading-relaxed">
              By aggregating data from multiple search engines, social platforms, and regional news sources, we offer a 360-degree view of India's digital pulse.
            </p>
          </div>
          <div className="w-full md:w-1/3 aspect-square bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.1)]">
            <Globe className="w-32 h-32 text-purple-400/50" />
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/40 border border-white/5 rounded-2xl p-6 hover:border-blue-500/30 transition-colors group">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Real-Time Velocity</h3>
            <p className="text-gray-400 text-sm">We process data streams as they happen, ensuring you're never acting on stale information. If it's trending now, it's on TrendsTracker.</p>
          </div>
          
          <div className="bg-black/40 border border-white/5 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors group">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Data Integrity</h3>
            <p className="text-gray-400 text-sm">Our algorithms aggressively filter out bots and manipulated trends, providing you with a clean, accurate representation of authentic human interest.</p>
          </div>
          
          <div className="bg-black/40 border border-white/5 rounded-2xl p-6 hover:border-rose-500/30 transition-colors group">
            <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-rose-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Built for Everyone</h3>
            <p className="text-gray-400 text-sm">Whether you are a journalist, a marketer, a developer, or just a curious individual, our intuitive dashboard makes complex data analysis accessible.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-b from-blue-900/20 to-black border border-blue-500/20 rounded-3xl p-12">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to explore the data?</h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">Dive into our powerful analytics engine and start discovering what India is searching for right now.</p>
        <Link href="/" className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all hover:scale-105">
          Go to Dashboard
        </Link>
      </div>

    </div>
  )
}
