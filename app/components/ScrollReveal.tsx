"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  direction?: "up" | "left" | "right" | "scale" | "fade"
  delay?: number // 1-6 for stagger delays
  duration?: number // ms
  className?: string
  threshold?: number // 0-1, how much of element must be visible
}

export function ScrollReveal({
  children,
  direction = "up",
  delay,
  duration = 800,
  className = "",
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("revealed")
            observer.unobserve(el)
          }
        })
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  const delayClass = delay ? `reveal-delay-${delay}` : ""
  const directionClass = `reveal-${direction}`

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${directionClass} ${delayClass} ${className}`}
      style={{ animationDuration: `${duration}ms` }}
    >
      {children}
    </div>
  )
}
