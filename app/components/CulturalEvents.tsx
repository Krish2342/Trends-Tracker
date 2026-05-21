"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Star, TrendingUp } from "lucide-react"

const culturalEvents = [
  {
    country: "India",
    flag: "🇮🇳",
    events: [
      { name: "Diwali Festival", date: "Nov 2024", searches: "45M+", trend: "+567%" },
      { name: "Holi Celebrations", date: "Mar 2024", searches: "32M+", trend: "+423%" },
      { name: "Durga Puja", date: "Oct 2024", searches: "28M+", trend: "+389%" },
      { name: "Karva Chauth", date: "Nov 2024", searches: "18M+", trend: "+234%" },
      { name: "Ganesh Chaturthi", date: "Sep 2024", searches: "25M+", trend: "+345%" },
      { name: "Navratri Festival", date: "Oct 2024", searches: "22M+", trend: "+298%" },
    ],
  },
]

export function CulturalEvents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-600" />
          Cultural Events & Festivals in India
        </CardTitle>
        <CardDescription>Trending cultural events and festivals across India</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {culturalEvents[0].events.map((event, eventIndex) => (
            <div key={eventIndex} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{event.name}</h4>
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{event.date}</span>
                  <Badge variant="outline" className="text-xs">
                    {event.searches}
                  </Badge>
                </div>
                <span className="text-green-600 font-medium">{event.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
