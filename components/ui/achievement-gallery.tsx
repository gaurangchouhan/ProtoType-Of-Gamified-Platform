"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CertificateGenerator } from "@/components/ui/certificate-generator"

const achievements = [
  {
    id: "ach_001",
    name: "First Steps",
    description: "Complete your first lesson",
    icon: "👶",
    category: "Academic Excellence",
    unlocked: true,
    rarity: "common",
    dateEarned: "2024-01-15",
  },
  {
    id: "ach_002",
    name: "Math Master",
    description: "Score 100% on 5 math quizzes",
    icon: "🧮",
    category: "Academic Excellence",
    unlocked: true,
    rarity: "rare",
    dateEarned: "2024-01-18",
  },
  {
    id: "ach_003",
    name: "Code Warrior",
    description: "Complete 10 coding challenges",
    icon: "💻",
    category: "Innovation Pioneer",
    unlocked: true,
    rarity: "epic",
    dateEarned: "2024-01-20",
  },
  {
    id: "ach_004",
    name: "Village Helper",
    description: "Help 5 classmates with their studies",
    icon: "🤝",
    category: "Community Helper",
    unlocked: false,
    rarity: "rare",
    dateEarned: "",
  },
  {
    id: "ach_005",
    name: "Cultural Ambassador",
    description: "Share local knowledge with the community",
    icon: "🏛️",
    category: "Cultural Ambassador",
    unlocked: false,
    rarity: "legendary",
    dateEarned: "",
  },
]

const rarityColors = {
  common: "bg-gray-500",
  rare: "bg-blue-500",
  epic: "bg-purple-500",
  legendary: "bg-yellow-500",
}

export function AchievementGallery() {
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null)
  const [showCertificate, setShowCertificate] = useState<any>(null)

  const generateCertificate = (achievement: any) => {
    if (achievement.unlocked) {
      setShowCertificate({
        id: achievement.id,
        title: achievement.name,
        description: achievement.description,
        category: achievement.category,
        dateEarned: achievement.dateEarned,
        rarity: achievement.rarity,
        icon: achievement.icon,
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
              achievement.unlocked
                ? "border-primary/20 bg-card hover:border-primary/40 animate-glow"
                : "border-muted bg-muted/20 opacity-60"
            }`}
            onClick={() => achievement.unlocked && setSelectedAchievement(achievement)}
          >
            <div className="text-center space-y-2">
              <div className={`text-4xl ${achievement.unlocked ? "animate-float" : "grayscale"}`}>
                {achievement.icon}
              </div>
              <h4 className="font-semibold text-sm">{achievement.name}</h4>
              <p className="text-xs text-muted-foreground">{achievement.description}</p>
              <Badge variant="outline" className={`text-xs ${rarityColors[achievement.rarity]} text-white border-0`}>
                {achievement.rarity}
              </Badge>
              {achievement.unlocked && (
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    generateCertificate(achievement)
                  }}
                  className="w-full mt-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-xs"
                >
                  🏆 Get Certificate
                </Button>
              )}
            </div>
            {!achievement.unlocked && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                <span className="text-2xl">🔒</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedAchievement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
            <div className="text-center space-y-4">
              <div className="text-6xl">{selectedAchievement.icon}</div>
              <h3 className="text-xl font-bold">{selectedAchievement.name}</h3>
              <p className="text-muted-foreground">{selectedAchievement.description}</p>
              <Badge className={`${rarityColors[selectedAchievement.rarity]} text-white`}>
                {selectedAchievement.category}
              </Badge>
              {selectedAchievement.dateEarned && (
                <p className="text-sm text-muted-foreground">Earned: {selectedAchievement.dateEarned}</p>
              )}
              <div className="flex space-x-2">
                <Button
                  onClick={() => generateCertificate(selectedAchievement)}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                >
                  🏆 Get Certificate
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedAchievement(null)}
                  className="flex-1 bg-transparent"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCertificate && (
        <CertificateGenerator
          achievement={showCertificate}
          studentName="Student Name" // This would come from user context
          onClose={() => setShowCertificate(null)}
        />
      )}

      <Button variant="outline" className="w-full bg-transparent">
        View All Achievements
      </Button>
    </div>
  )
}
