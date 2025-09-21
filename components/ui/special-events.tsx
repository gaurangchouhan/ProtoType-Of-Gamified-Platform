"use client"

import { useState, useEffect } from "react"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const specialEvents = [
  {
    id: 1,
    title: "Diwali Coding Challenge",
    description: "Create beautiful patterns with code during the festival of lights",
    icon: "🪔",
    timeLeft: "2 days 14 hours",
    participants: 1247,
    exclusiveBadge: "Festival Coder",
    color: "#f59e0b",
    active: true,
  },
  {
    id: 2,
    title: "Harvest Math Marathon",
    description: "Solve farming-related math problems during harvest season",
    icon: "🌾",
    timeLeft: "5 days 8 hours",
    participants: 892,
    exclusiveBadge: "Harvest Calculator",
    color: "#22c55e",
    active: true,
  },
  {
    id: 3,
    title: "Republic Day Quiz",
    description: "Test your knowledge about Indian history and culture",
    icon: "🇮🇳",
    timeLeft: "Coming Soon",
    participants: 0,
    exclusiveBadge: "Patriot Scholar",
    color: "#3b82f6",
    active: false,
  },
]

export function SpecialEvents() {
  const [currentEvent, setCurrentEvent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEvent((prev) => (prev + 1) % specialEvents.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <GlassmorphismCard className="relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold holographic">Special Events</h2>
        <Badge variant="secondary" className="animate-pulse">
          Limited Time
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {specialEvents.map((event, index) => (
          <div
            key={event.id}
            className={`relative p-4 rounded-lg border-2 transition-all duration-500 ${
              event.active
                ? `border-[${event.color}]/30 bg-gradient-to-br from-[${event.color}]/10 to-transparent animate-glow`
                : "border-muted bg-muted/20 opacity-60"
            } ${index === currentEvent ? "scale-105 z-10" : ""}`}
          >
            <div className="text-center space-y-3">
              <div className={`text-4xl ${event.active ? "animate-bounce" : ""}`}>{event.icon}</div>
              <h3 className="font-bold text-lg">{event.title}</h3>
              <p className="text-sm text-muted-foreground">{event.description}</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Time Left:</span>
                  <span className={`font-mono ${event.active ? "text-primary" : "text-muted-foreground"}`}>
                    {event.timeLeft}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Participants:</span>
                  <span>{event.participants.toLocaleString()}</span>
                </div>
              </div>

              <Badge
                variant="outline"
                className="w-full justify-center"
                style={{ borderColor: event.color, color: event.color }}
              >
                🏆 {event.exclusiveBadge}
              </Badge>

              <Button
                className="w-full"
                disabled={!event.active}
                style={{ backgroundColor: event.active ? event.color : undefined }}
              >
                {event.active ? "Join Event" : "Coming Soon"}
              </Button>
            </div>

            {!event.active && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                <span className="text-2xl">⏰</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Event navigation dots */}
      <div className="flex justify-center space-x-2 mt-6">
        {specialEvents.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentEvent ? "bg-primary w-6" : "bg-muted-foreground"
            }`}
            onClick={() => setCurrentEvent(index)}
          />
        ))}
      </div>
    </GlassmorphismCard>
  )
}
