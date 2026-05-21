import { NextResponse } from "next/server"
import { generateContextualRelated } from "../../utils/relatedData"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || ""
    const category = searchParams.get("cat") || "all"
    const type = searchParams.get("type") || "both" // queries, topics, or both

    if (!query) {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
    }

    // Generate contextual related data
    const relatedData = generateContextualRelated(query, category)

    // Filter based on type requested
    const response: any = {}

    if (type === "queries" || type === "both") {
      response.queries = relatedData.queries
    }

    if (type === "topics" || type === "both") {
      response.topics = relatedData.topics
    }

    return NextResponse.json({
      query,
      category,
      type,
      timestamp: new Date().toISOString(),
      ...response,
    })
  } catch (error) {
    console.error("Error fetching related data:", error)
    return NextResponse.json({ error: "Failed to fetch related data" }, { status: 500 })
  }
}
