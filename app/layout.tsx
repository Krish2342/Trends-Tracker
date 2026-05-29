import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "./contexts/AuthContext"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { IntroAnimation } from "./components/IntroAnimation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "India Trends Tracker - Analytics Platform",
  description:
    "real-time search trends analysis platform for India. Explore trending topics, compare search terms, and analyze data with our exclusive black-themed interface.",
  keywords: "trends, search trends, google trends, data analysis, trending topics, india, analytics",
    generator: 'v0.dev'
}

import { GlobalAuthModal } from "./components/auth/GlobalAuthModal"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} app-gradient`}>
        <IntroAnimation />
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
          </div>
          <GlobalAuthModal />
        </AuthProvider>
      </body>
    </html>
  )
}
