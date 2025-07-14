import { NextResponse } from "next/server"

const generateRealTimeData = () => {
  const queries = [
    "IPL Live Score",
    "Bollywood News",
    "All Blacks Match",
    "Mumbai Weather",
    "Auckland Traffic",
    "Diwali Shopping",
    "Rugby World Cup",
    "Indian Elections",
    "New Zealand Tourism",
    "Cricket Highlights",
    "Monsoon Update",
    "Kiwi Dollar",
    "Bangalore IT Jobs",
    "Wellington Events",
    "Tamil Movies",
    "Christchurch News",
  ]

  const categories = ["Sports", "Entertainment", "News", "Weather", "Finance", "Technology", "Politics"]

  return Array.from({ length: 10 }, (_, index) => ({
    rank: index + 1,
    query: queries[Math.floor(Math.random() * queries.length)],
    searches: `${(Math.random() * 5 + 1).toFixed(1)}M+`,
    change: `${Math.random() > 0.8 ? "-" : "+"}${Math.floor(Math.random() * 500 + 100)}%`,
    trend: Math.random() > 0.8 ? "down" : "up",
    category: categories[Math.floor(Math.random() * categories.length)],
    timestamp: Date.now(),
  }))
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const geo = searchParams.get("geo") || "worldwide"
    const category = searchParams.get("cat") || "all"

    const data = generateRealTimeData()

    // Filter by category if specified
    const filteredData =
      category === "all" ? data : data.filter((item) => item.category.toLowerCase() === category.toLowerCase())

    return NextResponse.json({
      geo,
      category,
      lastUpdated: new Date().toISOString(),
      isLive: true,
      totalSearches: `${(Math.random() * 5 + 10).toFixed(1)}M+`,
      risingTrends: filteredData.filter((item) => item.trend === "up").length,
      data: filteredData,
    })
  } catch (error) {
    console.error("Error fetching realtime data:", error)
    return NextResponse.json({ error: "Failed to fetch realtime data" }, { status: 500 })
  }
}
