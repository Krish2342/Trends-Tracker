import { NextResponse } from "next/server"

// Mock data for demonstration
const mockTrendsData = {
  "cricket world cup": {
    interest_over_time: [
      { date: "2024-01", value: 45 },
      { date: "2024-02", value: 52 },
      { date: "2024-03", value: 78 },
      { date: "2024-04", value: 95 },
      { date: "2024-05", value: 100 },
      { date: "2024-06", value: 88 },
      { date: "2024-07", value: 65 },
      { date: "2024-08", value: 72 },
      { date: "2024-09", value: 85 },
      { date: "2024-10", value: 92 },
      { date: "2024-11", value: 98 },
      { date: "2024-12", value: 89 },
    ],
    related_queries: [
      { query: "cricket live score", trend: "rising", change: "+450%" },
      { query: "bollywood news", trend: "top", change: "100%" },
      { query: "indian festivals", trend: "rising", change: "+520%" },
      { query: "mumbai weather", trend: "rising", change: "+380%" },
      { query: "ipl 2024", trend: "top", change: "95%" },
    ],
    regional_interest: [
      { region: "Maharashtra", interest: 99 },
      { region: "Delhi", interest: 95 },
      { region: "Karnataka", interest: 88 },
      { region: "Tamil Nadu", interest: 82 },
      { region: "West Bengal", interest: 78 },
      { region: "Gujarat", interest: 75 },
      { region: "Rajasthan", interest: 68 },
      { region: "Uttar Pradesh", interest: 65 },
    ],
  },
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")?.toLowerCase() || "cricket world cup"
    const timeRange = searchParams.get("time") || "12m"
    const region = searchParams.get("region") || "all-india"
    const category = searchParams.get("cat") || "all"

    // In a real implementation, you would fetch data from Google Trends API
    // For demo purposes, we return mock data
    const data = mockTrendsData[query as keyof typeof mockTrendsData] || mockTrendsData["cricket world cup"]

    return NextResponse.json({
      query,
      timeRange,
      region,
      category,
      data,
    })
  } catch (error) {
    console.error("Error fetching trends data:", error)
    return NextResponse.json({ error: "Failed to fetch trends data" }, { status: 500 })
  }
}
