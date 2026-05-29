"use client"

import { useEffect, useState } from "react"
import { TrendingUp } from "lucide-react"

export function IntroAnimation() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    // Only run the intro animation once per session
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro")
    if (hasSeenIntro) {
      setIsVisible(false)
      return
    }

    // Start fade out after 1.8 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true)
    }, 1800)

    // Remove from DOM after transition completes (2.5 seconds total)
    const removeTimer = setTimeout(() => {
      setIsVisible(false)
      sessionStorage.setItem("hasSeenIntro", "true")
    }, 2500)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-all duration-700 ease-out ${
        isFading ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black"></div>
      
      <div className="relative flex flex-col items-center z-10">
        {/* Animated Custom SVG Icon */}
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full animate-pulse"></div>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="80" 
            height="80" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
          >
            <path 
              d="M22 7L13.5 15.5L8.5 10.5L2 17" 
              className="animate-[draw-path_1.5s_ease-out_forwards]" 
              style={{ strokeDasharray: 50, strokeDashoffset: 50 }} 
            />
            <path 
              d="M16 7H22V13" 
              className="animate-[draw-path_1.5s_ease-out_forwards]" 
              style={{ strokeDasharray: 20, strokeDashoffset: 20 }} 
            />
          </svg>
        </div>

        {/* Text Area */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 tracking-widest text-glow mb-2 uppercase animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
          India Trends Tracker
        </h1>
        <p className="text-gray-400 text-sm tracking-widest uppercase animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
          Analyzing real-time insights...
        </p>

        {/* Loading Progress Bar */}
        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mt-8 relative animate-in fade-in duration-500 delay-300 fill-mode-both">
          <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full w-0 animate-[loading-bar_1.5s_ease-out_forwards]"></div>
        </div>
      </div>
    </div>
  )
}
