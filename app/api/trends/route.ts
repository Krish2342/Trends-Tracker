import { NextResponse } from "next/server"

const GNEWS_API_KEY = process.env.GNEWS_API_KEY
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

function extractText(xmlChunk: string, tag: string): string {
  const cdataMatch = xmlChunk.match(new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>`, "i"))
  if (cdataMatch) return cdataMatch[1].trim()
  const plainMatch = xmlChunk.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"))
  return plainMatch ? plainMatch[1].replace(/<[^>]+>/g, "").trim() : ""
}

function extractAttr(xmlChunk: string, tag: string, attr: string): string {
  const match = xmlChunk.match(new RegExp(`<${tag}[^>]+${attr}=["']([^"']+)["']`, "i"))
  return match ? match[1] : ""
}

async function fetchRssFeed(url: string, source: string): Promise<any[]> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; TrendsTracker/1.0)" },
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return []
    const xml = await res.text()
    const items = xml.match(/<item[\s\S]*?<\/item>/gi) || []
    return items.slice(0, 10).map((item) => {
      const title = extractText(item, "title")
      const link = extractText(item, "link") || extractAttr(item, "link", "href")
      const pubDate = extractText(item, "pubDate")
      const description = extractText(item, "description")
      const image =
        extractAttr(item, "enclosure", "url") ||
        extractAttr(item, "media:thumbnail", "url") ||
        extractAttr(item, "media:content", "url") ||
        null
      return {
        title,
        description,
        url: link,
        image,
        source,
        publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      }
    })
  } catch {
    return []
  }
}

async function fetchGoogleNewsSearch(query: string): Promise<any[]> {
  try {
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-IN&gl=IN&ceid=IN:en`
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" },
      signal: AbortSignal.timeout(6000),
    })
    if (!res.ok) return []
    const xml = await res.text()
    const items = xml.match(/<item[\s\S]*?<\/item>/gi) || []
    return items.slice(0, 10).map((item) => {
      const title = extractText(item, "title")
      const link = extractText(item, "link") || extractAttr(item, "link", "href")
      const pubDate = extractText(item, "pubDate")
      // Extract clean title and source from titles like "Title - Source"
      let cleanTitle = title || "No title"
      let source = "Google News"
      const dashIdx = cleanTitle.lastIndexOf(" - ")
      if (dashIdx !== -1) {
        source = cleanTitle.substring(dashIdx + 3).trim()
        cleanTitle = cleanTitle.substring(0, dashIdx).trim()
      }
      return {
        title: cleanTitle,
        description: extractText(item, "description").slice(0, 200),
        url: link,
        image: null,
        source: source,
        publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      }
    })
  } catch (e) {
    console.error("Google News search failed:", e)
    return []
  }
}

async function fetchGoogleSuggestions(query: string): Promise<string[]> {
  try {
    const url = `https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(query)}&hl=en-IN&gl=IN`
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" },
      signal: AbortSignal.timeout(4000),
    })
    if (!res.ok) return []
    const json = await res.json()
    if (Array.isArray(json) && Array.isArray(json[1])) {
      return json[1]
    }
    return []
  } catch (e) {
    console.error("Google Suggest failed:", e)
    return []
  }
}

// Simple hash to get stable seeded values based on query
function getQuerySeed(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash)
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || "India"
    const timeRange = searchParams.get("time") || "12m"
    const region = searchParams.get("region") || "all-india"

    let articles: any[] = []
    let youtubeData: any[] = []

    // 1. Fetch news articles matching the search query from GNews (if key configured)
    if (GNEWS_API_KEY) {
      try {
        const newsRes = await fetch(
          `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&country=in&lang=en&max=10&token=${GNEWS_API_KEY}`,
          { next: { revalidate: 300 } }
        )
        if (newsRes.ok) {
          const newsJson = await newsRes.json()
          articles = (newsJson.articles || []).map((a: any) => ({
            title: a.title,
            description: a.description,
            url: a.url,
            image: a.image,
            source: a.source?.name || "News",
            publishedAt: a.publishedAt,
          }))
        } else {
          console.warn("GNews API response status:", newsRes.status)
        }
      } catch (e) {
        console.warn("GNews search error:", e)
      }
    }

    // 2. Fetch YouTube videos (if key configured)
    if (GOOGLE_API_KEY) {
      try {
        const ytRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query + " India")}&type=video&regionCode=IN&maxResults=5&key=${GOOGLE_API_KEY}`,
          { next: { revalidate: 600 } }
        )
        if (ytRes.ok) {
          const ytJson = await ytRes.json()
          youtubeData = ytJson.items || []
        }
      } catch (e) {
        console.warn("YouTube API call failed:", e)
      }
    }

    // 3. Fallback to Google News Search RSS / standard RSS if GNews failed or was not configured
    if (articles.length === 0) {
      articles = await fetchGoogleNewsSearch(query)

      if (articles.length === 0) {
        const feeds = [
          { url: "https://feeds.feedburner.com/ndtvnews-top-stories", source: "NDTV" },
          { url: "https://timesofindia.indiatimes.com/rssfeedstopstories.cms", source: "Times of India" },
          { url: "https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml", source: "Hindustan Times" },
        ]

        const feedResults = await Promise.allSettled(feeds.map((f) => fetchRssFeed(f.url, f.source)))
        const allRss = feedResults.flatMap((r) => (r.status === "fulfilled" ? r.value : []))

        // Filter articles containing the query
        const lowerQuery = query.toLowerCase()
        articles = allRss.filter(
          (a) =>
            (a.title && a.title.toLowerCase().includes(lowerQuery)) ||
            (a.description && a.description.toLowerCase().includes(lowerQuery))
        )

        // Fallback if no matching news articles
        if (articles.length === 0) {
          articles = allRss.slice(0, 5)
          if (articles.length === 0) {
            articles = Array.from({ length: 5 }, (_, i) => ({
              title: `Latest updates and analytics reports for "${query}" in India`,
              description: `Aggregated data trends, interest over time, and regional stats for "${query}" analysis.`,
              url: "https://news.google.com",
              image: null,
              source: "TrendsTracker Analytics",
              publishedAt: new Date(Date.now() - i * 4 * 3600 * 1000).toISOString(),
            }))
          }
        }
      }
    }

    // 4. Generate stable, query-seeded statistics
    const seed = getQuerySeed(query)
    const now = new Date()

    // Deterministic interest over time
    const interest_over_time = Array.from({ length: 12 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1)
      const monthOffset = i
      const x = Math.sin(seed + monthOffset * 11) * 10000
      const randVal = x - Math.floor(x)
      // Base trend shape (sine curve) + variation
      const trendBase = 45 + Math.sin(monthOffset / 3) * 15
      const value = Math.floor(trendBase + randVal * 30)

      return {
        date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
        month: d.toLocaleString("default", { month: "short" }),
        value: Math.min(100, Math.max(10, value)),
      }
    })

    // Fetch real Google suggestions for fresh related queries & topics
    const googleSuggestions = await fetchGoogleSuggestions(query)

    // Deterministic related queries
    let related_queries: any[] = []
    if (googleSuggestions.length > 0) {
      related_queries = googleSuggestions.slice(0, 8).map((suggestion, i) => ({
        query: suggestion,
        url: `https://www.google.com/search?q=${encodeURIComponent(suggestion)}`,
        trend: i < 3 || Math.sin(seed + i) > 0 ? "rising" : "top",
        change: `+${Math.floor(((Math.sin(seed + i * 3) + 1) / 2) * 350 + 80)}%`,
      }))
    } else {
      related_queries = articles.slice(0, 5).map((article: any, i: number) => ({
        query: (article.title || "").slice(0, 45) + "...",
        url: article.url,
        trend: i < 3 ? "rising" : "top",
        change: `+${Math.floor(((Math.sin(seed + i * 3) + 1) / 2) * 350 + 80)}%`,
      }))

      if (related_queries.length === 0) {
        const subtopics = ["Analysis", "India News", "Live Updates", "Review", "Stats"]
        related_queries = subtopics.map((sub, i) => ({
          query: `${query} ${sub}`,
          url: `https://www.google.com/search?q=${encodeURIComponent(query + " " + sub)}`,
          trend: i < 3 ? "rising" : "top",
          change: `+${Math.floor(((Math.sin(seed + i * 2) + 1) / 2) * 450 + 50)}%`,
        }))
      }
    }

    // Deterministic related topics
    let related_topics: any[] = []
    if (googleSuggestions.length > 0) {
      related_topics = googleSuggestions.slice(1, 7).map((suggestion, i) => {
        let topicName = suggestion
        // If it starts with the query, clean it up
        if (topicName.toLowerCase().startsWith(query.toLowerCase())) {
          topicName = topicName.substring(query.length).trim()
        }
        // Capitalize each word
        topicName = topicName.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
        if (!topicName) {
          topicName = suggestion.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
        } else {
          topicName = `${query.toUpperCase()} ${topicName}`
        }
        return {
          query: topicName,
          trend: i % 2 === 0 || Math.cos(seed + i) > 0 ? "rising" : "top",
          change: `+${Math.floor(((Math.cos(seed + i * 2) + 1) / 2) * 200 + 40)}%`,
        }
      })
    } else {
      const topicSuffixes = ["Matches", "Squad", "Live Coverage", "News", "Schedule"]
      related_topics = topicSuffixes.map((suffix, i) => ({
        query: `${query} ${suffix}`,
        trend: i % 2 === 0 ? "rising" : "top",
        change: `+${Math.floor(((Math.cos(seed + i * 2) + 1) / 2) * 200 + 40)}%`,
      }))
    }

    // Deterministic regional interest
    const states = [
      "Maharashtra",
      "Delhi",
      "Karnataka",
      "Tamil Nadu",
      "West Bengal",
      "Gujarat",
      "Rajasthan",
      "Uttar Pradesh",
      "Kerala",
      "Punjab",
      "Haryana",
      "Telangana",
    ]

    const regional_interest = states
      .map((state, i) => {
        const x = Math.sin(seed + i * 7) * 10000
        const randVal = x - Math.floor(x)
        const interest = Math.floor(35 + randVal * 65)
        return { region: state, interest }
      })
      .sort((a, b) => b.interest - a.interest)
      .slice(0, 8)

    // YouTube format
    let related_videos = youtubeData.map((item: any) => ({
      title: item.snippet?.title || "",
      channel: item.snippet?.channelTitle || "",
      thumbnail: item.snippet?.thumbnails?.medium?.url || null,
      videoId: item.id?.videoId || "",
      publishedAt: item.snippet?.publishedAt || "",
    }))

    if (related_videos.length === 0) {
      const mockTitles = [
        `${query} Explained: Analysis & Impact in India`,
        `Latest updates on ${query} - National News Coverage`,
        `Why is ${query} trending? Everything you need to know`,
        `Public debate: The rise of ${query} in the digital landscape`,
      ]
      related_videos = mockTitles.map((title, i) => {
        const x = Math.sin(seed + i * 13) * 10000
        const randVal = x - Math.floor(x)
        const videoId = `mock_yt_${Math.floor(randVal * 10000000)}`
        return {
          title,
          channel: "TrendsTracker Insights",
          thumbnail: null,
          videoId,
          publishedAt: new Date(Date.now() - i * 24 * 3600 * 1000).toISOString(),
        }
      })
    }

    return NextResponse.json({
      query,
      timeRange,
      region,
      totalResults: articles.length,
      articles: articles.slice(0, 10),
      data: {
        interest_over_time,
        related_queries,
        related_topics,
        regional_interest,
        related_videos,
      },
    })
  } catch (error) {
    console.error("Error fetching trends data:", error)
    return NextResponse.json({ error: "Failed to fetch trends data" }, { status: 500 })
  }
}
