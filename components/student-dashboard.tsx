"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"
import { FloatingParticles } from "@/components/ui/floating-particles"
import { ProgressRing } from "@/components/ui/progress-ring"
import { SkillTree } from "@/components/ui/skill-tree"
import { VillageLeaderboard } from "@/components/ui/village-leaderboard"
import { StudyRoomCustomizer } from "@/components/ui/study-room-customizer"
import { MascotPet } from "@/components/ui/mascot-pet"
import { AchievementGallery } from "@/components/ui/achievement-gallery"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth"
import { LogOut, Settings, Trophy, Gamepad2, Users, GraduationCap } from "lucide-react"

export function StudentDashboard() {
  const [selectedRoom, setSelectedRoom] = useState("farmhouse")
  const [showAchievements, setShowAchievements] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  const studentData = {
    name: user?.name || "Student",
    avatar: user?.avatar || "👤",
    level: user?.level || 1,
    xp: user?.xp || 0,
    xpToNext: 550,
    streak: user?.streak || 0,
    totalPoints: (user?.xp || 0) * 3.5,
    rank: user?.rank || 1,
    subjects: [
      { name: "Mathematics", progress: user?.subjects?.Mathematics?.progress || 0, color: "#d97706" },
      { name: "Science", progress: user?.subjects?.Science?.progress || 0, color: "#3b82f6" },
      { name: "English", progress: user?.subjects?.English?.progress || 0, color: "#22c55e" },
      { name: "Coding", progress: user?.subjects?.Coding?.progress || 0, color: "#f59e0b" },
    ],
    recentAchievements: user?.achievements || [],
  }

  const overallProgress = Math.round(
    studentData.subjects.reduce((acc, subject) => acc + subject.progress, 0) / studentData.subjects.length,
  )

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleGamesNavigation = () => {
    router.push("/games")
  }

  const handleAchievementsView = () => {
    setShowAchievements(true)
  }

  const handleTeacherView = () => {
    router.push("/teacher")
  }

  const handleParentView = () => {
    router.push("/parent")
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingParticles count={15} />

      {/* Header */}
      <header className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-3xl animate-float">
              {studentData.avatar}
            </div>
            <div>
              <h1 className="text-2xl font-bold holographic">Welcome back, {studentData.name}!</h1>
              <p className="text-muted-foreground">
                Level {studentData.level} • {studentData.streak} day streak 🔥
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="animate-glow">
              Rank #{studentData.rank}
            </Badge>
            <Button variant="outline" className="glassmorphism bg-transparent" onClick={handleTeacherView}>
              <GraduationCap className="w-4 h-4 mr-2" />
              Teacher View
            </Button>
            <Button variant="outline" className="glassmorphism bg-transparent" onClick={handleParentView}>
              <Users className="w-4 h-4 mr-2" />
              Parent View
            </Button>
            <Button variant="outline" className="glassmorphism bg-transparent" onClick={handleGamesNavigation}>
              <Gamepad2 className="w-4 h-4 mr-2" />
              Games
            </Button>
            <Button variant="outline" className="glassmorphism bg-transparent">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="outline"
              className="glassmorphism bg-transparent text-red-500 hover:text-red-600"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Top Section - Progress Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Overall Progress */}
          <GlassmorphismCard className="text-center">
            <h3 className="text-lg font-semibold mb-4">Overall Progress</h3>
            <ProgressRing progress={overallProgress} />
            <div className="mt-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                {studentData.xp} / {studentData.xp + studentData.xpToNext} XP
              </p>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(studentData.xp / (studentData.xp + studentData.xpToNext)) * 100}%` }}
                />
              </div>
            </div>
          </GlassmorphismCard>

          {/* Learning Streak */}
          <GlassmorphismCard className="text-center">
            <h3 className="text-lg font-semibold mb-4">Learning Streak</h3>
            <div className="text-6xl mb-2">🔥</div>
            <div className="text-3xl font-bold holographic">{studentData.streak}</div>
            <p className="text-sm text-muted-foreground mt-2">Days in a row</p>
            <Button size="sm" className="mt-4">
              Keep it going!
            </Button>
          </GlassmorphismCard>

          {/* Total Points */}
          <GlassmorphismCard className="text-center">
            <h3 className="text-lg font-semibold mb-4">Total Points</h3>
            <div className="text-6xl mb-2">⭐</div>
            <div className="text-3xl font-bold holographic">{Math.round(studentData.totalPoints).toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-2">Points earned</p>
          </GlassmorphismCard>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="h-16 text-lg animate-glow" onClick={handleGamesNavigation}>
            <Gamepad2 className="w-6 h-6 mr-2" />
            Play Games
          </Button>
          <Button
            variant="outline"
            className="h-16 text-lg glassmorphism bg-transparent"
            onClick={handleAchievementsView}
          >
            <Trophy className="w-6 h-6 mr-2" />
            View Achievements & Certificates
          </Button>
          <Button variant="outline" className="h-16 text-lg glassmorphism bg-transparent">
            <Settings className="w-6 h-6 mr-2" />
            Customize Profile
          </Button>
        </div>

        {/* Subject Progress */}
        <GlassmorphismCard>
          <h3 className="text-xl font-semibold mb-6">Subject Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {studentData.subjects.map((subject, index) => (
              <div key={subject.name} className="text-center">
                <div className="mb-3">
                  <ProgressRing progress={subject.progress} size={80} strokeWidth={6} />
                </div>
                <h4 className="font-medium">{subject.name}</h4>
                <p className="text-sm text-muted-foreground">{subject.progress}% Complete</p>
              </div>
            ))}
          </div>
        </GlassmorphismCard>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skill Tree */}
          <GlassmorphismCard>
            <h3 className="text-xl font-semibold mb-4">Skill Tree</h3>
            <SkillTree />
          </GlassmorphismCard>

          {/* Village Leaderboard */}
          <GlassmorphismCard>
            <h3 className="text-xl font-semibold mb-4">Village Leaderboard</h3>
            <VillageLeaderboard currentRank={studentData.rank} />
          </GlassmorphismCard>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Achievements */}
          <GlassmorphismCard>
            <h3 className="text-xl font-semibold mb-4">Recent Achievements</h3>
            <div className="space-y-3">
              {studentData.recentAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center space-x-3 p-2 rounded-lg bg-muted/50">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <p className="font-medium">{achievement.name}</p>
                    <p className="text-sm text-muted-foreground">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent" onClick={handleAchievementsView}>
              View All Achievements & Get Certificates
            </Button>
          </GlassmorphismCard>

          {/* Study Room Customizer */}
          <GlassmorphismCard>
            <h3 className="text-xl font-semibold mb-4">Study Room</h3>
            <StudyRoomCustomizer selectedRoom={selectedRoom} onRoomChange={setSelectedRoom} />
          </GlassmorphismCard>

          {/* Mascot Pet */}
          <GlassmorphismCard>
            <h3 className="text-xl font-semibold mb-4">Your Learning Buddy</h3>
            <MascotPet level={studentData.level} />
          </GlassmorphismCard>
        </div>
      </div>

      {/* Achievements Modal with Certificate Functionality */}
      {showAchievements && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <GlassmorphismCard className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold holographic">Your Achievements & Certificates</h2>
                <Button variant="outline" onClick={() => setShowAchievements(false)} className="bg-transparent">
                  Close
                </Button>
              </div>
              <AchievementGallery />
            </div>
          </GlassmorphismCard>
        </div>
      )}
    </div>
  )
}
