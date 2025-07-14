// Database of related queries and topics for different search terms
export interface RelatedItem {
  query: string
  trend: "rising" | "top"
  change: string
  category?: string
}

export interface RelatedData {
  queries: RelatedItem[]
  topics: RelatedItem[]
}

const relatedDatabase: Record<string, RelatedData> = {
  // Cricket related searches
  cricket: {
    queries: [
      { query: "cricket live score", trend: "rising", change: "+450%" },
      { query: "ipl 2024 schedule", trend: "top", change: "100%" },
      { query: "cricket world cup", trend: "rising", change: "+380%" },
      { query: "india vs australia", trend: "rising", change: "+520%" },
      { query: "cricket news today", trend: "top", change: "95%" },
    ],
    topics: [
      { query: "Indian Premier League", trend: "rising", change: "+450%" },
      { query: "Cricket World Cup", trend: "top", change: "100%" },
      { query: "Test Cricket", trend: "rising", change: "+280%" },
      { query: "T20 Cricket", trend: "rising", change: "+320%" },
      { query: "Cricket Players", trend: "top", change: "85%" },
    ],
  },

  // IPL related searches
  ipl: {
    queries: [
      { query: "ipl live score", trend: "rising", change: "+890%" },
      { query: "ipl 2024 points table", trend: "top", change: "100%" },
      { query: "ipl auction 2024", trend: "rising", change: "+670%" },
      { query: "mumbai indians vs csk", trend: "rising", change: "+540%" },
      { query: "ipl final 2024", trend: "top", change: "95%" },
    ],
    topics: [
      { query: "Mumbai Indians", trend: "rising", change: "+890%" },
      { query: "Chennai Super Kings", trend: "top", change: "100%" },
      { query: "Royal Challengers Bangalore", trend: "rising", change: "+670%" },
      { query: "IPL Auction", trend: "rising", change: "+540%" },
      { query: "IPL Trophy", trend: "top", change: "85%" },
    ],
  },

  // Bollywood related searches
  bollywood: {
    queries: [
      { query: "bollywood movies 2024", trend: "rising", change: "+560%" },
      { query: "bollywood news today", trend: "top", change: "100%" },
      { query: "bollywood box office", trend: "rising", change: "+430%" },
      { query: "bollywood songs", trend: "rising", change: "+380%" },
      { query: "bollywood awards", trend: "top", change: "90%" },
    ],
    topics: [
      { query: "Shah Rukh Khan", trend: "rising", change: "+560%" },
      { query: "Bollywood Movies", trend: "top", change: "100%" },
      { query: "Hindi Cinema", trend: "rising", change: "+430%" },
      { query: "Bollywood Actors", trend: "rising", change: "+380%" },
      { query: "Film Industry", trend: "top", change: "85%" },
    ],
  },

  // Weather related searches
  weather: {
    queries: [
      { query: "mumbai weather today", trend: "rising", change: "+340%" },
      { query: "monsoon forecast india", trend: "top", change: "100%" },
      { query: "delhi weather", trend: "rising", change: "+420%" },
      { query: "bangalore weather", trend: "rising", change: "+280%" },
      { query: "chennai weather", trend: "top", change: "75%" },
    ],
    topics: [
      { query: "Monsoon Season", trend: "rising", change: "+340%" },
      { query: "Weather Forecast", trend: "top", change: "100%" },
      { query: "Climate Change", trend: "rising", change: "+280%" },
      { query: "Rainfall", trend: "rising", change: "+220%" },
      { query: "Temperature", trend: "top", change: "70%" },
    ],
  },

  // Technology related searches
  technology: {
    queries: [
      { query: "artificial intelligence", trend: "rising", change: "+650%" },
      { query: "machine learning", trend: "top", change: "100%" },
      { query: "digital india", trend: "rising", change: "+480%" },
      { query: "tech startups india", trend: "rising", change: "+390%" },
      { query: "blockchain technology", trend: "top", change: "85%" },
    ],
    topics: [
      { query: "Artificial Intelligence", trend: "rising", change: "+650%" },
      { query: "Machine Learning", trend: "top", change: "100%" },
      { query: "Digital Transformation", trend: "rising", change: "+480%" },
      { query: "Tech Innovation", trend: "rising", change: "+390%" },
      { query: "Software Development", trend: "top", change: "80%" },
    ],
  },

  // Festival related searches
  diwali: {
    queries: [
      { query: "diwali 2024 date", trend: "rising", change: "+890%" },
      { query: "diwali recipes", trend: "top", change: "100%" },
      { query: "diwali decorations", trend: "rising", change: "+670%" },
      { query: "diwali gifts", trend: "rising", change: "+540%" },
      { query: "diwali rangoli", trend: "top", change: "92%" },
    ],
    topics: [
      { query: "Festival of Lights", trend: "rising", change: "+890%" },
      { query: "Hindu Festival", trend: "top", change: "100%" },
      { query: "Diwali Celebration", trend: "rising", change: "+670%" },
      { query: "Indian Festival", trend: "rising", change: "+540%" },
      { query: "Lakshmi Puja", trend: "top", change: "88%" },
    ],
  },

  // Finance related searches
  finance: {
    queries: [
      { query: "indian stock market", trend: "rising", change: "+420%" },
      { query: "rupee exchange rate", trend: "top", change: "100%" },
      { query: "cryptocurrency india", trend: "rising", change: "+380%" },
      { query: "mutual funds", trend: "rising", change: "+290%" },
      { query: "gold price today", trend: "top", change: "85%" },
    ],
    topics: [
      { query: "Stock Market", trend: "rising", change: "+420%" },
      { query: "Currency Exchange", trend: "top", change: "100%" },
      { query: "Investment", trend: "rising", change: "+380%" },
      { query: "Banking", trend: "rising", change: "+290%" },
      { query: "Financial Planning", trend: "top", change: "80%" },
    ],
  },

  // Tourism related searches
  tourism: {
    queries: [
      { query: "india travel guide", trend: "rising", change: "+560%" },
      { query: "goa tourism", trend: "top", change: "100%" },
      { query: "kerala backwaters", trend: "rising", change: "+450%" },
      { query: "rajasthan tourism", trend: "rising", change: "+380%" },
      { query: "himachal pradesh", trend: "top", change: "88%" },
    ],
    topics: [
      { query: "Travel Destinations", trend: "rising", change: "+560%" },
      { query: "Tourism Industry", trend: "top", change: "100%" },
      { query: "Adventure Tourism", trend: "rising", change: "+450%" },
      { query: "Cultural Tourism", trend: "rising", change: "+380%" },
      { query: "Eco Tourism", trend: "top", change: "82%" },
    ],
  },

  // Default fallback for unknown searches
  default: {
    queries: [
      { query: "trending news india", trend: "rising", change: "+250%" },
      { query: "latest updates", trend: "top", change: "100%" },
      { query: "popular topics", trend: "rising", change: "+180%" },
      { query: "current events india", trend: "rising", change: "+220%" },
      { query: "breaking news", trend: "top", change: "75%" },
    ],
    topics: [
      { query: "Current Events", trend: "rising", change: "+250%" },
      { query: "News Updates", trend: "top", change: "100%" },
      { query: "Popular Culture", trend: "rising", change: "+180%" },
      { query: "Social Media", trend: "rising", change: "+220%" },
      { query: "Entertainment", trend: "top", change: "70%" },
    ],
  },
}

export function getRelatedData(searchTerm: string): RelatedData {
  if (!searchTerm) return relatedDatabase.default

  const normalizedTerm = searchTerm.toLowerCase().trim()

  // Direct match
  if (relatedDatabase[normalizedTerm]) {
    return relatedDatabase[normalizedTerm]
  }

  // Partial matches
  for (const [key, data] of Object.entries(relatedDatabase)) {
    if (key === "default") continue

    if (normalizedTerm.includes(key) || key.includes(normalizedTerm)) {
      return data
    }
  }

  // Check for keyword matches
  const keywords = normalizedTerm.split(" ")
  for (const keyword of keywords) {
    if (relatedDatabase[keyword]) {
      return relatedDatabase[keyword]
    }
  }

  // Contextual matches based on common terms
  if (normalizedTerm.includes("movie") || normalizedTerm.includes("film") || normalizedTerm.includes("actor")) {
    return relatedDatabase.bollywood
  }

  if (normalizedTerm.includes("sport") || normalizedTerm.includes("match") || normalizedTerm.includes("game")) {
    return relatedDatabase.cricket
  }

  if (normalizedTerm.includes("tech") || normalizedTerm.includes("ai") || normalizedTerm.includes("digital")) {
    return relatedDatabase.technology
  }

  if (normalizedTerm.includes("festival") || normalizedTerm.includes("celebration")) {
    return relatedDatabase.diwali
  }

  if (normalizedTerm.includes("money") || normalizedTerm.includes("investment") || normalizedTerm.includes("market")) {
    return relatedDatabase.finance
  }

  if (normalizedTerm.includes("travel") || normalizedTerm.includes("visit") || normalizedTerm.includes("destination")) {
    return relatedDatabase.tourism
  }

  if (normalizedTerm.includes("rain") || normalizedTerm.includes("temperature") || normalizedTerm.includes("climate")) {
    return relatedDatabase.weather
  }

  // Return default if no matches found
  return relatedDatabase.default
}

// Function to generate dynamic related data based on search context
export function generateContextualRelated(searchTerm: string, category?: string): RelatedData {
  const baseData = getRelatedData(searchTerm)

  // Add some randomization to make it feel more dynamic
  const shuffleArray = (array: any[]): any[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Modify change percentages slightly for variety
  const addVariation = (items: any[]): any[] => {
    return items.map((item) => ({
      ...item,
      change: item.change.replace(/\d+/, (match) => {
        const num = Number.parseInt(match)
        const variation = Math.floor(Math.random() * 20) - 10 // ±10%
        return Math.max(10, num + variation).toString()
      }),
    }))
  }

  return {
    queries: addVariation(shuffleArray(baseData.queries).slice(0, 5)),
    topics: addVariation(shuffleArray(baseData.topics).slice(0, 5)),
  }
}
