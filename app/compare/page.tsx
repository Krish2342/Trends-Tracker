"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Plus, BarChart3 } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const colors = ["#2563eb", "#dc2626", "#16a34a", "#ca8a04", "#9333ea"]

const mockData = [
  { month: "Jan", "AI Technology": 65, "Machine Learning": 45, "Deep Learning": 35, "Neural Networks": 25 },
  { month: "Feb", "AI Technology": 72, "Machine Learning": 52, "Deep Learning": 42, "Neural Networks": 32 },
  { month: "Mar", "AI Technology": 68, "Machine Learning": 48, "Deep Learning": 38, "Neural Networks": 28 },
  { month: "Apr", "AI Technology": 85, "Machine Learning": 65, "Deep Learning": 55, "Neural Networks": 45 },
  { month: "May", "AI Technology": 92, "Machine Learning": 72, "Deep Learning": 62, "Neural Networks": 52 },
  { month: "Jun", "AI Technology": 88, "Machine Learning": 68, "Deep Learning": 58, "Neural Networks": 48 },
  { month: "Jul", "AI Technology": 95, "Machine Learning": 75, "Deep Learning": 65, "Neural Networks": 55 },
  { month: "Aug", "AI Technology": 100, "Machine Learning": 80, "Deep Learning": 70, "Neural Networks": 60 },
  { month: "Sep", "AI Technology": 87, "Machine Learning": 67, "Deep Learning": 57, "Neural Networks": 47 },
  { month: "Oct", "AI Technology": 90, "Machine Learning": 70, "Deep Learning": 60, "Neural Networks": 50 },
  { month: "Nov", "AI Technology": 94, "Machine Learning": 74, "Deep Learning": 64, "Neural Networks": 54 },
  { month: "Dec", "AI Technology": 89, "Machine Learning": 69, "Deep Learning": 59, "Neural Networks": 49 },
]

export default function ComparePage() {
  const [keywords, setKeywords] = useState(["AI Technology", "Machine Learning"])
  const [newKeyword, setNewKeyword] = useState("")

  const addKeyword = () => {
    if (newKeyword.trim() && keywords.length < 5 && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()])
      setNewKeyword("")
    }
  }

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Compare Search Terms</h1>
        <p className="text-muted-foreground mb-6">Compare the search interest of up to 5 different terms over time</p>

        {/* Keyword Management */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Search Terms
            </CardTitle>
            <CardDescription>Add up to 5 terms to compare their search trends</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Current Keywords */}
            <div className="flex flex-wrap gap-2 mb-4">
              {keywords.map((keyword, index) => (
                <Badge
                  key={keyword}
                  variant="outline"
                  className="px-3 py-1 text-sm"
                  style={{ borderColor: colors[index], color: colors[index] }}
                >
                  {keyword}
                  <button onClick={() => removeKeyword(keyword)} className="ml-2 hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>

            {/* Add New Keyword */}
            {keywords.length < 5 && (
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter a search term..."
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addKeyword()}
                  className="max-w-sm"
                />
                <Button onClick={addKeyword} disabled={!newKeyword.trim()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Term
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Comparison Chart */}
        {keywords.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Search Interest Comparison</CardTitle>
              <CardDescription>Interest over time for the selected search terms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {keywords.map((keyword, index) => (
                      <Line
                        key={keyword}
                        type="monotone"
                        dataKey={keyword}
                        stroke={colors[index]}
                        strokeWidth={3}
                        dot={{ fill: colors[index], strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Comparison Stats */}
        {keywords.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {keywords.map((keyword, index) => (
              <Card key={keyword}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index] }} />
                    {keyword}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Peak Interest:</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Average:</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Trend:</span>
                      <Badge variant="default" className="text-xs">
                        Rising
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
