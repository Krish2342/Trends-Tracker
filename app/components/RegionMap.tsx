"use client"

import { Card, CardContent } from "@/components/ui/card"

const regionData = [
  { region: "Maharashtra", interest: 100, color: "#1e40af" },
  { region: "Delhi", interest: 95, color: "#3b82f6" },
  { region: "Karnataka", interest: 88, color: "#60a5fa" },
  { region: "Tamil Nadu", interest: 82, color: "#93c5fd" },
  { region: "West Bengal", interest: 78, color: "#bfdbfe" },
  { region: "Gujarat", interest: 75, color: "#dbeafe" },
  { region: "Rajasthan", interest: 68, color: "#eff6ff" },
  { region: "Uttar Pradesh", interest: 65, color: "#f8fafc" },
]

export function RegionMap() {
  return (
    <div className="space-y-4">
      {/* Simplified map representation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {regionData.map((region, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">{region.region}</span>
                <span className="text-xs text-muted-foreground">{region.interest}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${region.interest}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-600 rounded"></div>
          <span>High Interest</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-300 rounded"></div>
          <span>Medium Interest</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-100 rounded"></div>
          <span>Low Interest</span>
        </div>
      </div>
    </div>
  )
}
