"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const leaderboardData = [
  { rank: 1, name: "Arjun Kumar", points: 9250, avatar: "👦", streak: 15 },
  { rank: 2, name: "Meera Patel", points: 8900, avatar: "👧", streak: 12 },
  { rank: 3, name: "Priya Sharma", points: 8750, avatar: "👧", streak: 12, isCurrentUser: true },
  { rank: 4, name: "Ravi Singh", points: 8200, avatar: "👦", streak: 8 },
  { rank: 5, name: "Anita Devi", points: 7850, avatar: "👩", streak: 10 },
]

interface VillageLeaderboardProps {
  currentRank: number
}

export function VillageLeaderboard({ currentRank }: VillageLeaderboardProps) {
  return (
    <div className="space-y-3">
      {leaderboardData.map((user, index) => (
        <div
          key={user.rank}
          className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
            user.isCurrentUser ? "bg-primary/10 border border-primary/20 animate-glow" : "bg-muted/30 hover:bg-muted/50"
          }`}
        >
          <div className="flex items-center space-x-3 flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                user.rank === 1
                  ? "bg-yellow-500 text-white"
                  : user.rank === 2
                    ? "bg-gray-400 text-white"
                    : user.rank === 3
                      ? "bg-amber-600 text-white"
                      : "bg-muted text-muted-foreground"
              }`}
            >
              {user.rank}
            </div>
            <Avatar className="w-10 h-10">
              <AvatarFallback className="text-lg">{user.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className={`font-medium ${user.isCurrentUser ? "text-primary" : ""}`}>{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.points.toLocaleString()} points</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {user.streak}🔥
            </Badge>
            {user.rank === 1 && <span className="text-lg">👑</span>}
          </div>
        </div>
      ))}
    </div>
  )
}
