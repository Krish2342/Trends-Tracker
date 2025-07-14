"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Globe, MapPin, TrendingUp } from "lucide-react"
import { RegionMap } from "../components/RegionMap"

const categoryData = {
  technology: [
    { topic: "Digital India Initiative", interest: 100, change: "+65%" },
    { topic: "UPI Payments", interest: 95, change: "+78%" },
    { topic: "Indian IT Services", interest: 88, change: "+52%" },
    { topic: "Startup India", interest: 82, change: "+45%" },
    { topic: "AI in India", interest: 75, change: "+38%" },
  ],
  sports: [
    { topic: "IPL Cricket", interest: 100, change: "+180%" },
    { topic: "Indian Premier League", interest: 95, change: "+167%" },
    { topic: "Cricket World Cup", interest: 90, change: "+123%" },
    { topic: "Indian Cricket Team", interest: 85, change: "+145%" },
    { topic: "Kabaddi League", interest: 78, change: "+89%" },
  ],
  entertainment: [
    { topic: "Bollywood Movies", interest: 100, change: "+120%" },
    { topic: "Indian Web Series", interest: 92, change: "+98%" },
    { topic: "Tamil Movies", interest: 88, change: "+87%" },
    { topic: "Telugu Cinema", interest: 85, change: "+76%" },
    { topic: "Hindi TV Shows", interest: 75, change: "+56%" },
  ],
  lifestyle: [
    { topic: "Indian Festivals", interest: 100, change: "+145%" },
    { topic: "Yoga and Meditation", interest: 88, change: "+67%" },
    { topic: "Indian Cuisine", interest: 92, change: "+89%" },
    { topic: "Traditional Clothing", interest: 78, change: "+54%" },
    { topic: "Ayurveda", interest: 65, change: "+34%" },
  ],
}

const regionData = [
  {
    region: "North India",
    topics: ["Delhi Politics", "Punjab Agriculture", "Himachal Tourism", "Haryana Sports", "UP Elections"],
    growth: "+68%",
  },
  {
    region: "South India",
    topics: ["Bangalore Tech", "Chennai Auto", "Hyderabad IT", "Kerala Tourism", "Tamil Cinema"],
    growth: "+78%",
  },
  {
    region: "West India",
    topics: ["Mumbai Finance", "Gujarat Business", "Goa Tourism", "Pune IT", "Rajasthan Heritage"],
    growth: "+65%",
  },
  {
    region: "East India",
    topics: ["Kolkata Culture", "Bhubaneswar Smart City", "Assam Tea", "Jharkhand Mining", "West Bengal Politics"],
    growth: "+45%",
  },
]

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("technology")
  const [selectedRegion, setSelectedRegion] = useState("all-india")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2 mb-4">
          <Globe className="w-8 h-8 text-primary" />
          Explore Indian Trends
        </h1>
        <p className="text-muted-foreground">Discover trending topics by category and region across India</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
            <SelectItem value="entertainment">Entertainment</SelectItem>
            <SelectItem value="lifestyle">Lifestyle</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-india">All India</SelectItem>
            <SelectItem value="north-india">North India</SelectItem>
            <SelectItem value="south-india">South India</SelectItem>
            <SelectItem value="west-india">West India</SelectItem>
            <SelectItem value="east-india">East India</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="capitalize">{selectedCategory} Trends</CardTitle>
            <CardDescription>Top trending topics in {selectedCategory}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryData[selectedCategory as keyof typeof categoryData]?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground font-bold text-xs">
                      {index + 1}
                    </div>
                    <span className="font-medium">{item.topic}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="text-sm font-medium">{item.interest}%</div>
                      <div className="text-xs text-green-600">{item.change}</div>
                    </div>
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regional Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Regional Insights</CardTitle>
            <CardDescription>Popular topics by Indian regions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regionData.map((region, index) => (
                <div key={index} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="font-semibold">{region.region}</span>
                    </div>
                    <Badge variant="default" className="text-xs">
                      {region.growth}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {region.topics.map((topic, topicIndex) => (
                      <Badge key={topicIndex} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* India Map */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Interest Across Indian States</CardTitle>
          <CardDescription>Search interest by state for {selectedCategory} topics</CardDescription>
        </CardHeader>
        <CardContent>
          <RegionMap />
        </CardContent>
      </Card>

      {/* Category Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Trending Topics</p>
                <p className="text-2xl font-bold">
                  {categoryData[selectedCategory as keyof typeof categoryData]?.length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Regions Covered</p>
                <p className="text-2xl font-bold">{regionData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Growth</p>
                <p className="text-2xl font-bold">+64%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
