"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"
import { FloatingParticles } from "@/components/ui/floating-particles"
import { BadgeConstellation } from "@/components/ui/badge-constellation"
import { GameGrid } from "@/components/ui/game-grid"
import { SpecialEvents } from "@/components/ui/special-events"
import { MultiplayerChallenges } from "@/components/ui/multiplayer-challenges"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import { ArrowLeft, Home, LogOut } from "lucide-react"

export function GamesSection() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleBackToDashboard = () => {
    router.push("/dashboard")
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingParticles count={20} />

      {/* Header */}
      <header className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={handleBackToDashboard} className="glassmorphism bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-lg">
                {user?.avatar || "👤"}
              </div>
              <div>
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-muted-foreground">Level {user?.level || 1}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleBackToDashboard} className="glassmorphism bg-transparent">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="glassmorphism bg-transparent text-red-500 hover:text-red-600"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold holographic">Learning Games</h1>
          <p className="text-lg text-muted-foreground">Master skills through play and earn amazing badges!</p>
        </div>
      </header>

      <div className="p-6 space-y-8">
        {/* Badge Constellation */}
        <GlassmorphismCard>
          <h2 className="text-2xl font-bold mb-6 text-center">Your Badge Collection</h2>
          <BadgeConstellation />
        </GlassmorphismCard>

        {/* Special Events */}
        <SpecialEvents />

        {/* Main Games Content */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 glassmorphism">
            <TabsTrigger value="all">All Games</TabsTrigger>
            <TabsTrigger value="coding">Coding</TabsTrigger>
            <TabsTrigger value="math">Math</TabsTrigger>
            <TabsTrigger value="science">Science</TabsTrigger>
            <TabsTrigger value="language">Language</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <GameGrid category="all" />
          </TabsContent>

          <TabsContent value="coding" className="space-y-6">
            <GameGrid category="coding" />
          </TabsContent>

          <TabsContent value="math" className="space-y-6">
            <GameGrid category="math" />
          </TabsContent>

          <TabsContent value="science" className="space-y-6">
            <GameGrid category="science" />
          </TabsContent>

          <TabsContent value="language" className="space-y-6">
            <GameGrid category="language" />
          </TabsContent>
        </Tabs>

        {/* Multiplayer Challenges */}
        <MultiplayerChallenges />
      </div>
    </div>
  )
}
