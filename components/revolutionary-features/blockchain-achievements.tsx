"use client"

import { useState, useEffect } from "react"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CertificateGenerator } from "@/components/ui/certificate-generator"

interface BlockchainAchievement {
  id: string
  title: string
  description: string
  category: string
  dateEarned: string
  blockHash: string
  transactionId: string
  verified: boolean
  rarity: "common" | "rare" | "epic" | "legendary"
  icon: string
}

export function BlockchainAchievements() {
  const [achievements, setAchievements] = useState<BlockchainAchievement[]>([])
  const [selectedAchievement, setSelectedAchievement] = useState<BlockchainAchievement | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [showCertificate, setShowCertificate] = useState<BlockchainAchievement | null>(null)

  // Mock blockchain achievements
  const mockAchievements: BlockchainAchievement[] = [
    {
      id: "ach_001",
      title: "First Steps in Learning",
      description: "Completed your first lesson on GramQuest",
      category: "Academic Excellence",
      dateEarned: "2024-01-15",
      blockHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
      transactionId: "0xabc123def456789012345678901234567890abcd",
      verified: true,
      rarity: "common",
      icon: "🎓",
    },
    {
      id: "ach_002",
      title: "Code Warrior",
      description: "Completed 10 coding challenges in Eco-Coder",
      category: "Innovation Pioneer",
      dateEarned: "2024-01-20",
      blockHash: "0x2b3c4d5e6f7890abcdef1234567890abcdef123",
      transactionId: "0xdef456789012345678901234567890abcdef123",
      verified: true,
      rarity: "epic",
      icon: "💻",
    },
    {
      id: "ach_003",
      title: "Village Helper",
      description: "Helped 5 classmates with their studies",
      category: "Community Helper",
      dateEarned: "2024-01-25",
      blockHash: "0x3c4d5e6f7890abcdef1234567890abcdef1234",
      transactionId: "0x789012345678901234567890abcdef1234567",
      verified: true,
      rarity: "rare",
      icon: "🤝",
    },
  ]

  useEffect(() => {
    // Simulate loading achievements from blockchain
    setTimeout(() => {
      setAchievements(mockAchievements)
    }, 1000)
  }, [])

  const connectWallet = async () => {
    // Simulate wallet connection
    setIsVerifying(true)
    setTimeout(() => {
      setWalletConnected(true)
      setIsVerifying(false)
    }, 2000)
  }

  const verifyAchievement = async (achievement: BlockchainAchievement) => {
    setIsVerifying(true)
    // Simulate blockchain verification
    setTimeout(() => {
      setIsVerifying(false)
      alert(`Achievement verified on blockchain!\nBlock Hash: ${achievement.blockHash}`)
    }, 3000)
  }

  const shareAchievement = (achievement: BlockchainAchievement) => {
    const shareText = `I just earned the "${achievement.title}" achievement on GramQuest! 🎉\nVerified on blockchain: ${achievement.blockHash.substring(0, 10)}...`

    if (navigator.share) {
      navigator.share({
        title: "GramQuest Achievement",
        text: shareText,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(shareText)
      alert("Achievement details copied to clipboard!")
    }
  }

  const generateCertificate = (achievement: BlockchainAchievement) => {
    setShowCertificate(achievement)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-500"
      case "rare":
        return "bg-blue-500"
      case "epic":
        return "bg-purple-500"
      case "legendary":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case "rare":
        return "animate-glow"
      case "epic":
        return "animate-shimmer"
      case "legendary":
        return "animate-float animate-glow"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      {/* Blockchain Connection Status */}
      <GlassmorphismCard>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">⛓️</div>
            <div>
              <h3 className="font-bold">Blockchain Credentials</h3>
              <p className="text-sm text-muted-foreground">
                {walletConnected ? "Connected to blockchain network" : "Connect to verify achievements"}
              </p>
            </div>
          </div>
          {!walletConnected ? (
            <Button onClick={connectWallet} disabled={isVerifying} className="animate-glow">
              {isVerifying ? "Connecting..." : "Connect Wallet"}
            </Button>
          ) : (
            <Badge variant="secondary" className="animate-pulse">
              ✅ Verified
            </Badge>
          )}
        </div>
      </GlassmorphismCard>

      {/* Achievement Gallery */}
      <GlassmorphismCard>
        <h3 className="text-xl font-bold mb-6 text-center holographic">Blockchain-Verified Achievements</h3>

        {achievements.length === 0 ? (
          <div className="text-center space-y-4">
            <div className="text-4xl animate-spin">⚡</div>
            <p className="text-muted-foreground">Loading achievements from blockchain...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  achievement.verified ? "border-green-500/30 bg-green-500/5" : "border-yellow-500/30 bg-yellow-500/5"
                } ${getRarityGlow(achievement.rarity)}`}
                onClick={() => setSelectedAchievement(achievement)}
              >
                <div className="text-center space-y-3">
                  <div className="text-4xl animate-float">{achievement.icon}</div>
                  <h4 className="font-semibold">{achievement.title}</h4>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>

                  <div className="flex justify-center space-x-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${getRarityColor(achievement.rarity)} text-white border-0`}
                    >
                      {achievement.rarity}
                    </Badge>
                    {achievement.verified && (
                      <Badge variant="outline" className="text-xs bg-green-500 text-white border-0">
                        Verified
                      </Badge>
                    )}
                  </div>

                  <div className="text-xs text-muted-foreground">{achievement.dateEarned}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassmorphismCard>

      {/* Achievement Details Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <GlassmorphismCard className="max-w-md mx-4">
            <div className="text-center space-y-4">
              <div className={`text-6xl ${getRarityGlow(selectedAchievement.rarity)}`}>{selectedAchievement.icon}</div>

              <h3 className="text-xl font-bold">{selectedAchievement.title}</h3>
              <p className="text-muted-foreground">{selectedAchievement.description}</p>

              <div className="space-y-2">
                <Badge className={`${getRarityColor(selectedAchievement.rarity)} text-white`}>
                  {selectedAchievement.category}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {selectedAchievement.rarity}
                </Badge>
              </div>

              {/* Blockchain Details */}
              <div className="bg-muted/30 p-3 rounded-lg text-left space-y-2">
                <h4 className="font-semibold text-sm">Blockchain Details:</h4>
                <div className="text-xs space-y-1">
                  <div>
                    <strong>Block Hash:</strong>
                    <br />
                    <code className="bg-muted/50 px-1 rounded text-xs">{selectedAchievement.blockHash}</code>
                  </div>
                  <div>
                    <strong>Transaction ID:</strong>
                    <br />
                    <code className="bg-muted/50 px-1 rounded text-xs">{selectedAchievement.transactionId}</code>
                  </div>
                  <div>
                    <strong>Date Earned:</strong> {selectedAchievement.dateEarned}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => verifyAchievement(selectedAchievement)}
                  disabled={isVerifying || !walletConnected}
                  className="flex-1"
                >
                  {isVerifying ? "Verifying..." : "Verify on Chain"}
                </Button>
                <Button
                  onClick={() => generateCertificate(selectedAchievement)}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                >
                  🏆 Get Certificate
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={() => shareAchievement(selectedAchievement)}
                className="w-full bg-transparent"
              >
                Share Achievement
              </Button>

              <Button variant="outline" onClick={() => setSelectedAchievement(null)} className="w-full bg-transparent">
                Close
              </Button>
            </div>
          </GlassmorphismCard>
        </div>
      )}

      {/* Certificate Generator Modal */}
      {showCertificate && (
        <CertificateGenerator
          achievement={showCertificate}
          studentName="Student Name" // This would come from user context
          onClose={() => setShowCertificate(null)}
        />
      )}

      {/* Blockchain Info */}
      <GlassmorphismCard>
        <div className="text-center space-y-4">
          <h4 className="font-semibold">Why Blockchain Verification?</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <div className="text-2xl">🔒</div>
              <h5 className="font-medium">Tamper-Proof</h5>
              <p className="text-muted-foreground">Your achievements are permanently recorded and cannot be altered</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">🌐</div>
              <h5 className="font-medium">Globally Recognized</h5>
              <p className="text-muted-foreground">Verified credentials accepted by institutions worldwide</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">👤</div>
              <h5 className="font-medium">You Own It</h5>
              <p className="text-muted-foreground">Complete control over your educational credentials</p>
            </div>
          </div>
        </div>
      </GlassmorphismCard>
    </div>
  )
}
