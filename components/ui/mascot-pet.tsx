"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const petStages = [
  { level: 1, emoji: "🥚", name: "Egg", description: "Your learning journey begins!" },
  { level: 5, emoji: "🐣", name: "Hatchling", description: "First steps in learning" },
  { level: 10, emoji: "🐤", name: "Chick", description: "Growing knowledge" },
  { level: 15, emoji: "🐦", name: "Bird", description: "Soaring through subjects" },
  { level: 20, emoji: "🦅", name: "Eagle", description: "Master of learning!" },
]

interface MascotPetProps {
  level: number
}

export function MascotPet({ level }: MascotPetProps) {
  const [isHappy, setIsHappy] = useState(false)
  const [lastInteraction, setLastInteraction] = useState<string>("")

  const currentStage = petStages.reduce((prev, current) => (level >= current.level ? current : prev))

  const interactions = [
    { action: "Feed", emoji: "🍎", message: "Yum! Knowledge is delicious!" },
    { action: "Play", emoji: "🎾", message: "Let's learn through play!" },
    { action: "Study", emoji: "📖", message: "Time to grow smarter together!" },
  ]

  const handleInteraction = (interaction: (typeof interactions)[0]) => {
    setIsHappy(true)
    setLastInteraction(interaction.message)
    setTimeout(() => setIsHappy(false), 2000)
  }

  return (
    <div className="text-center space-y-4">
      {/* Pet display */}
      <div className="relative">
        <div className={`text-8xl transition-transform duration-300 ${isHappy ? "animate-bounce" : "animate-float"}`}>
          {currentStage.emoji}
        </div>
        {isHappy && <div className="absolute -top-2 -right-2 text-2xl animate-bounce">❤️</div>}
      </div>

      {/* Pet info */}
      <div>
        <h4 className="font-semibold text-lg">{currentStage.name}</h4>
        <p className="text-sm text-muted-foreground">{currentStage.description}</p>
        <p className="text-xs text-muted-foreground mt-1">Level {level}</p>
      </div>

      {/* Interaction message */}
      {lastInteraction && <div className="bg-primary/10 rounded-lg p-2 text-sm animate-fade-in">{lastInteraction}</div>}

      {/* Interaction buttons */}
      <div className="flex justify-center space-x-2">
        {interactions.map((interaction) => (
          <Button
            key={interaction.action}
            variant="outline"
            size="sm"
            onClick={() => handleInteraction(interaction)}
            className="flex flex-col items-center p-2 h-auto"
          >
            <span className="text-lg mb-1">{interaction.emoji}</span>
            <span className="text-xs">{interaction.action}</span>
          </Button>
        ))}
      </div>

      {/* Next evolution preview */}
      {level < 20 && (
        <div className="text-xs text-muted-foreground">
          Next evolution at level {petStages.find((stage) => stage.level > level)?.level}
        </div>
      )}
    </div>
  )
}
