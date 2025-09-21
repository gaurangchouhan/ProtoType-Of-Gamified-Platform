"use client"

import { useState } from "react"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const challenges = [
  {
    id: 1,
    title: "Village Math Battle",
    description: "Team up with classmates to solve complex problems",
    type: "Cooperative",
    players: "2-4 players",
    difficulty: "Intermediate",
    timeLimit: "30 minutes",
    reward: "Team Spirit Badge",
    icon: "🤝",
    color: "#22c55e",
    activeRooms: 12,
  },
  {
    id: 2,
    title: "Code Race Championship",
    description: "Speed coding competition against other villages",
    type: "Competitive",
    players: "1v1 or Teams",
    difficulty: "Advanced",
    timeLimit: "45 minutes",
    reward: "Speed Coder Badge",
    icon: "🏁",
    color: "#3b82f6",
    activeRooms: 8,
  },
  {
    id: 3,
    title: "Science Quiz League",
    description: "Weekly quiz tournament with schools nationwide",
    type: "Tournament",
    players: "Individual",
    difficulty: "All Levels",
    timeLimit: "20 minutes",
    reward: "Quiz Champion Badge",
    icon: "🏆",
    color: "#f59e0b",
    activeRooms: 25,
  },
]

const waitingPlayers = [
  { name: "Arjun", avatar: "👦", level: 15 },
  { name: "Meera", avatar: "👧", level: 12 },
  { name: "Ravi", avatar: "👦", level: 18 },
  { name: "Priya", avatar: "👧", level: 14 },
]

export function MultiplayerChallenges() {
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const handleJoinChallenge = (challengeId: number) => {
    setSelectedChallenge(challengeId)
    setIsSearching(true)
    // Simulate matchmaking
    setTimeout(() => {
      setIsSearching(false)
      console.log("Match found!")
    }, 3000)
  }

  return (
    <GlassmorphismCard>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold holographic">Multiplayer Challenges</h2>
        <Badge variant="secondary" className="animate-pulse">
          Live Now
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className="relative p-4 rounded-lg border border-border/50 bg-gradient-to-br from-card/50 to-transparent hover:border-primary/30 transition-all duration-300"
          >
            <div className="text-center space-y-3">
              <div
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl animate-float"
                style={{ backgroundColor: `${challenge.color}20` }}
              >
                {challenge.icon}
              </div>

              <h3 className="font-bold text-lg">{challenge.title}</h3>
              <p className="text-sm text-muted-foreground">{challenge.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <Badge variant="outline" className="text-xs">
                    {challenge.type}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Players:</span>
                  <span>{challenge.players}</span>
                </div>
                <div className="flex justify-between">
                  <span>Difficulty:</span>
                  <span>{challenge.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Limit:</span>
                  <span>{challenge.timeLimit}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Rooms:</span>
                  <span className="text-primary font-medium">{challenge.activeRooms}</span>
                </div>
              </div>

              <Badge
                variant="outline"
                className="w-full justify-center"
                style={{ borderColor: challenge.color, color: challenge.color }}
              >
                🏆 {challenge.reward}
              </Badge>

              <Button
                className="w-full"
                onClick={() => handleJoinChallenge(challenge.id)}
                disabled={isSearching}
                style={{ backgroundColor: challenge.color }}
              >
                {isSearching && selectedChallenge === challenge.id ? "Finding Match..." : "Join Challenge"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Waiting players section */}
      <div className="mt-8 p-4 bg-muted/20 rounded-lg">
        <h3 className="font-semibold mb-4 text-center">Players Looking for Teammates</h3>
        <div className="flex justify-center space-x-4">
          {waitingPlayers.map((player, index) => (
            <div key={index} className="text-center">
              <Avatar className="w-12 h-12 mx-auto mb-2">
                <AvatarFallback className="text-lg">{player.avatar}</AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium">{player.name}</p>
              <p className="text-xs text-muted-foreground">Level {player.level}</p>
              <Button size="sm" variant="outline" className="mt-2 text-xs bg-transparent">
                Invite
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Matchmaking modal */}
      {isSearching && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <GlassmorphismCard className="text-center space-y-4">
            <div className="text-6xl animate-spin">⚡</div>
            <h3 className="text-xl font-bold">Finding Perfect Match...</h3>
            <p className="text-muted-foreground">Matching you with players of similar skill level</p>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            </div>
            <Button variant="outline" onClick={() => setIsSearching(false)}>
              Cancel
            </Button>
          </GlassmorphismCard>
        </div>
      )}
    </GlassmorphismCard>
  )
}
