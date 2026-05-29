"use client"

import { Card, CardContent } from "@/components/ui/card"

const defaultRegionData = [
  { region: "Maharashtra", interest: 100 },
  { region: "Delhi", interest: 95 },
  { region: "Karnataka", interest: 88 },
  { region: "Tamil Nadu", interest: 82 },
  { region: "West Bengal", interest: 78 },
  { region: "Gujarat", interest: 75 },
  { region: "Rajasthan", interest: 68 },
  { region: "Uttar Pradesh", interest: 65 },
]

interface RegionInterest {
  region: string
  interest: number
}

interface RegionMapProps {
  regionData?: RegionInterest[]
}

export function RegionMap({ regionData }: RegionMapProps) {
  const displayData = regionData && regionData.length > 0 ? regionData : defaultRegionData

  return (
    <div className="space-y-4">
      {/* Simplified map representation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayData.map((region, index) => (
          <Card key={index} className="hover:shadow-md hover:border-blue-500/30 transition-all cursor-pointer glass-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm text-gray-200">{region.region}</span>
                <span className="text-xs text-blue-400 font-semibold">{region.interest}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-indigo-500 h-2 rounded-full transition-all duration-505"
                  style={{ width: `${region.interest}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground pt-2">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-600 rounded"></div>
          <span className="text-gray-400">High Interest</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-indigo-500 rounded"></div>
          <span className="text-gray-400">Medium Interest</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-white/10 rounded"></div>
          <span className="text-gray-400">Low Interest</span>
        </div>
      </div>
    </div>
  )
}
