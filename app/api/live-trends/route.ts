import { NextResponse } from "next/server"

// This simulates real Google Trends data
// In production, you'd connect to actual Google Trends API
export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Generate realistic trending data for India
    const indianTrends = [
      "IPL Live Score",
      "Bollywood News",
      "Mumbai Weather",
      "Indian Elections",
      "Cricket Highlights",
      "Diwali Shopping",
      "Tech Jobs India",
      "Stock Market India",
      "Indian Festivals",
      "Monsoon Updates",
    ]

    const trends = indianTrends.map((keyword, index) => ({
      keyword,
      searches: Math.floor(Math.random() * 1000000) + 100000,
      change: `+${Math.floor(Math.random() * 500) + 50}%`,
      timestamp: new Date(),
      rank: index + 1,
    }))

    return NextResponse.json({
      success: true,
      trends,
      lastUpdated: new Date().toISOString(),
      region: "India",
    })
  } catch (error) {
    console.error("Error fetching trends:", error)
    return NextResponse.json({ error: "Failed to fetch trends data" }, { status: 500 })
  }
}
