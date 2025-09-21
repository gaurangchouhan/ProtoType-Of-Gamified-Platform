"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card" // Import GlassmorphismCard

const badgeCategories = [
  {
    name: "Academic Excellence",
    color: "#d97706",
    badges: [
      { id: 1, name: "Math Master", icon: "🧮", unlocked: true, rarity: "rare" },
      { id: 2, name: "Science Explorer", icon: "🔬", unlocked: true, rarity: "epic" },
      { id: 3, name: "Language Wizard", icon: "📚", unlocked: false, rarity: "legendary" },
    ],
  },
  {
    name: "Community Helper",
    color: "#22c55e",
    badges: [
      { id: 4, name: "Peer Tutor", icon: "🤝", unlocked: true, rarity: "common" },
      { id: 5, name: "Village Guide", icon: "🗺️", unlocked: false, rarity: "rare" },
      { id: 6, name: "Knowledge Sharer", icon: "💡", unlocked: false, rarity: "epic" },
    ],
  },
  {
    name: "Innovation Pioneer",
    color: "#3b82f6",
    badges: [
      { id: 7, name: "Code Warrior", icon: "💻", unlocked: true, rarity: "epic" },
      { id: 8, name: "Tech Creator", icon: "⚡", unlocked: false, rarity: "legendary" },
      { id: 9, name: "Future Builder", icon: "🚀", unlocked: false, rarity: "legendary" },
    ],
  },
  {
    name: "Cultural Ambassador",
    color: "#f59e0b",
    badges: [
      { id: 10, name: "Tradition Keeper", icon: "🏛️", unlocked: false, rarity: "rare" },
      { id: 11, name: "Story Teller", icon: "📖", unlocked: true, rarity: "common" },
      { id: 12, name: "Cultural Bridge", icon: "🌉", unlocked: false, rarity: "epic" },
    ],
  },
]

const rarityEffects = {
  common: "animate-pulse",
  rare: "animate-glow",
  epic: "animate-shimmer",
  legendary: "animate-float animate-glow",
}

export function BadgeConstellation() {
  const [selectedBadge, setSelectedBadge] = useState<number | null>(null)
  const [shareMessage, setShareMessage] = useState("")

  const handleBadgeClick = (badge: any) => {
    if (badge.unlocked) {
      setSelectedBadge(badge.id)
    }
  }

  const handleShare = (badge: any) => {
    setShareMessage(`Just earned the ${badge.name} badge in GramQuest! 🎉`)
    setTimeout(() => setShareMessage(""), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Floating badge constellation */}
      <div className="relative h-96 bg-gradient-to-b from-primary/5 via-secondary/5 to-accent/5 rounded-xl overflow-hidden">
        {badgeCategories.map((category, categoryIndex) => (
          <div key={category.name} className="absolute inset-0">
            {category.badges.map((badge, badgeIndex) => {
              const angle = (categoryIndex * 90 + badgeIndex * 30) * (Math.PI / 180)
              const radius = 120 + categoryIndex * 20
              const x = 50 + Math.cos(angle) * (radius / 4)
              const y = 50 + Math.sin(angle) * (radius / 4)

              return (
                <button
                  key={badge.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 flex items-center justify-center text-2xl transition-all duration-300 ${
                    badge.unlocked
                      ? `bg-card border-[${category.color}] hover:scale-110 ${rarityEffects[badge.rarity]}`
                      : "bg-muted border-muted-foreground opacity-50 grayscale"
                  }`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  onClick={() => handleBadgeClick(badge)}
                >
                  {badge.unlocked ? badge.icon : "🔒"}
                </button>
              )
            })}
          </div>
        ))}

        {/* Connecting lines between badges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {badgeCategories.map((category, categoryIndex) =>
            category.badges.map((badge, badgeIndex) => {
              if (badgeIndex === 0) return null
              const prevBadge = category.badges[badgeIndex - 1]
              const angle1 = (categoryIndex * 90 + (badgeIndex - 1) * 30) * (Math.PI / 180)
              const angle2 = (categoryIndex * 90 + badgeIndex * 30) * (Math.PI / 180)
              const radius = 120 + categoryIndex * 20
              const x1 = 50 + Math.cos(angle1) * (radius / 4)
              const y1 = 50 + Math.sin(angle1) * (radius / 4)
              const x2 = 50 + Math.cos(angle2) * (radius / 4)
              const y2 = 50 + Math.sin(angle2) * (radius / 4)

              return (
                <line
                  key={`${badge.id}-line`}
                  x1={`${x1}%`}
                  y1={`${y1}%`}
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke={badge.unlocked && prevBadge.unlocked ? category.color : "#6b7280"}
                  strokeWidth="2"
                  strokeDasharray={badge.unlocked && prevBadge.unlocked ? "0" : "5,5"}
                  opacity="0.6"
                />
              )
            }),
          )}
        </svg>
      </div>

      {/* Badge categories legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badgeCategories.map((category) => (
          <div key={category.name} className="text-center">
            <div className="w-4 h-4 rounded-full mx-auto mb-2" style={{ backgroundColor: category.color }} />
            <p className="text-sm font-medium">{category.name}</p>
            <p className="text-xs text-muted-foreground">
              {category.badges.filter((b) => b.unlocked).length}/{category.badges.length} earned
            </p>
          </div>
        ))}
      </div>

      {/* Badge details modal */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <GlassmorphismCard className="max-w-md mx-4">
            {(() => {
              const badge = badgeCategories.flatMap((c) => c.badges).find((b) => b.id === selectedBadge)
              const category = badgeCategories.find((c) => c.badges.some((b) => b.id === selectedBadge))

              return badge && category ? (
                <div className="text-center space-y-4">
                  <div className={`text-6xl ${rarityEffects[badge.rarity]}`}>{badge.icon}</div>
                  <h3 className="text-xl font-bold">{badge.name}</h3>
                  <Badge style={{ backgroundColor: category.color }} className="text-white">
                    {category.name}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {badge.rarity}
                  </Badge>
                  <div className="flex space-x-2">
                    <Button onClick={() => handleShare(badge)} className="flex-1">
                      Share Achievement
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedBadge(null)}>
                      Close
                    </Button>
                  </div>
                </div>
              ) : null
            })()}
          </GlassmorphismCard>
        </div>
      )}

      {/* Share message */}
      {shareMessage && (
        <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-4 rounded-lg animate-fade-in">
          {shareMessage}
        </div>
      )}
    </div>
  )
}
