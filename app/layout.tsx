import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "./contexts/AuthContext"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "India Trends Tracker - Premium Analytics Platform",
  description:
    "Premium real-time search trends analysis platform for India. Explore trending topics, compare search terms, and analyze data with our exclusive black-themed interface.",
  keywords: "trends, search trends, google trends, data analysis, trending topics, india, premium analytics",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} premium-gradient`}>
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <ProtectedRoute>{children}</ProtectedRoute>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
