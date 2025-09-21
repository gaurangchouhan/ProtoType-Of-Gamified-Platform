"use client"

import { useState } from "react"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const games = [
  {
    id: 1,
    title: "Eco-Coder",
    description: "Save the planet through coding",
    category: "coding",
    difficulty: "Beginner",
    icon: "🌍",
    progress: 65,
    players: 1247,
    badges: ["Code Warrior", "Eco Hero"],
    color: "#22c55e",
  },
  {
    id: 2,
    title: "AI Quiz Duel",
    description: "Fast-paced quiz competition",
    category: "all",
    difficulty: "Intermediate",
    icon: "🎮",
    progress: 45,
    players: 892,
    badges: ["Quiz Master", "Speed Demon"],
    color: "#3b82f6",
  },
  {
    id: 3,
    title: "Recipe Coder",
    description: "Learn programming through cooking",
    category: "coding",
    difficulty: "Beginner",
    icon: "👨‍🍳",
    progress: 80,
    players: 654,
    badges: ["Chef Coder", "Logic Master"],
    color: "#f59e0b",
  },
  {
    id: 4,
    title: "Math Village",
    description: "Solve problems to build your village",
    category: "math",
    difficulty: "Intermediate",
    icon: "🏘️",
    progress: 30,
    players: 1156,
    badges: ["Village Builder", "Math Wizard"],
    color: "#d97706",
  },
  {
    id: 5,
    title: "Science Lab",
    description: "Conduct virtual experiments",
    category: "science",
    difficulty: "Advanced",
    icon: "🔬",
    progress: 15,
    players: 423,
    badges: ["Lab Expert", "Discovery Pioneer"],
    color: "#8b5cf6",
  },
  {
    id: 6,
    title: "Story Weaver",
    description: "Create interactive stories",
    category: "language",
    difficulty: "Beginner",
    icon: "📚",
    progress: 90,
    players: 789,
    badges: ["Story Master", "Word Wizard"],
    color: "#ec4899",
  },
]

const difficultyColors = {
  Beginner: "bg-green-500",
  Intermediate: "bg-yellow-500",
  Advanced: "bg-red-500",
}

interface GameGridProps {
  category: string
}

export function GameGrid({ category }: GameGridProps) {
  const [hoveredGame, setHoveredGame] = useState<number | null>(null)

  const filteredGames = category === "all" ? games : games.filter((game) => game.category === category)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredGames.map((game) => (
        <GlassmorphismCard
          key={game.id}
          className={`relative overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer ${
            hoveredGame === game.id ? "animate-glow" : ""
          }`}
          onMouseEnter={() => setHoveredGame(game.id)}
          onMouseLeave={() => setHoveredGame(null)}
        >
          {/* Game header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl animate-float"
                style={{ backgroundColor: `${game.color}20` }}
              >
                {game.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg">{game.title}</h3>
                <p className="text-sm text-muted-foreground">{game.description}</p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{game.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-1000"
                style={{
                  width: `${game.progress}%`,
                  backgroundColor: game.color,
                }}
              />
            </div>
          </div>

          {/* Game stats */}
          <div className="flex items-center justify-between mb-4">
            <Badge className={`${difficultyColors[game.difficulty]} text-white border-0`}>{game.difficulty}</Badge>
            <span className="text-sm text-muted-foreground">{game.players.toLocaleString()} players</span>
          </div>

          {/* Available badges */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Earn these badges:</p>
            <div className="flex flex-wrap gap-1">
              {game.badges.map((badge) => (
                <Badge key={badge} variant="outline" className="text-xs">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>

          {/* Play button */}
          <Button className="w-full" style={{ backgroundColor: game.color }}>
            {game.progress > 0 ? "Continue Playing" : "Start Game"}
          </Button>

          {/* Hover effect overlay */}
          {hoveredGame === game.id && (
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 pointer-events-none" />
          )}
        </GlassmorphismCard>
      ))}
    </div>
  )
}
