"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"
import { Badge } from "@/components/ui/badge"

interface CertificateProps {
  achievement: {
    id: string
    title: string
    description: string
    category: string
    dateEarned: string
    rarity: string
    icon: string
  }
  studentName: string
  onClose: () => void
}

export function CertificateGenerator({ achievement, studentName, onClose }: CertificateProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const certificateRef = useRef<HTMLDivElement>(null)

  const generateCertificate = async () => {
    setIsGenerating(true)

    // Simulate certificate generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create certificate image using canvas
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (ctx) {
      canvas.width = 1200
      canvas.height = 800

      // Background - cream/beige color
      ctx.fillStyle = "#faf8f5"
      ctx.fillRect(0, 0, 1200, 800)

      // Dotted border
      ctx.strokeStyle = "#d4af37"
      ctx.lineWidth = 3
      ctx.setLineDash([8, 8])
      ctx.strokeRect(30, 30, 1140, 740)
      ctx.setLineDash([]) // Reset dash

      // Main title
      ctx.fillStyle = "#2d3748"
      ctx.font = "bold 48px serif"
      ctx.textAlign = "center"
      ctx.fillText("CERTIFICATE OF ACHIEVEMENT", 600, 150)

      // Subtitle
      ctx.font = "italic 24px serif"
      ctx.fillText("Presented in Recognition of Outstanding Performance", 600, 200)

      // Student name
      ctx.font = "bold 56px serif"
      ctx.fillText(studentName.toUpperCase(), 600, 320)

      // Underline for name
      ctx.strokeStyle = "#2d3748"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(200, 340)
      ctx.lineTo(1000, 340)
      ctx.stroke()

      // Motivational text
      ctx.font = "italic 28px serif"
      ctx.fillText("keep hardworking and your growth will continue", 600, 400)

      // Achievement description
      ctx.font = "italic 20px serif"
      ctx.fillText("Exceptional performance in the course", 600, 440)

      // Gold seal/badge (simplified circle)
      ctx.beginPath()
      ctx.arc(600, 550, 60, 0, 2 * Math.PI)
      ctx.fillStyle = "#d4af37"
      ctx.fill()
      ctx.strokeStyle = "#b8860b"
      ctx.lineWidth = 4
      ctx.stroke()

      // Seal text
      ctx.fillStyle = "#2d3748"
      ctx.font = "bold 14px sans-serif"
      ctx.fillText("OFFICIAL", 600, 540)
      ctx.fillText("2025", 600, 560)
      ctx.fillText("AWARD", 600, 580)

      // Date section
      ctx.font = "16px serif"
      ctx.textAlign = "left"
      ctx.fillText("date", 200, 650)
      ctx.strokeStyle = "#2d3748"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(200, 680)
      ctx.lineTo(400, 680)
      ctx.stroke()
      ctx.font = "14px serif"
      ctx.fillText("Issue Date", 250, 700)

      // Signature section
      ctx.textAlign = "right"
      ctx.font = "italic 24px serif"
      ctx.fillText("gramquest", 1000, 650)
      ctx.strokeStyle = "#2d3748"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(800, 680)
      ctx.lineTo(1000, 680)
      ctx.stroke()
      ctx.font = "14px serif"
      ctx.fillText("team of gramquest", 950, 700)

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const a = document.createElement("a")
          a.href = url
          a.download = `${studentName}-${achievement.title}-Certificate.png`
          a.click()
          URL.revokeObjectURL(url)
        }
      })
    }

    setIsGenerating(false)
  }

  const shareOnLinkedIn = () => {
    const text = `🎓 Excited to share that I've earned the "${achievement.title}" certificate from GramQuest Education Platform! 

This achievement represents my dedication to learning and growth in ${achievement.category}. 

${achievement.description}

#Education #Learning #Achievement #GramQuest #SkillDevelopment #OnlineLearning`

    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodeURIComponent(text)}`
    window.open(linkedInUrl, "_blank")
  }

  const shareOnInstagram = () => {
    // Generate Instagram story text
    const instagramText = `🎓 Just earned "${achievement.title}" on GramQuest! 

${achievement.description}

#GramQuest #Education #Achievement #Learning #Certificate #${achievement.category.replace(/\s+/g, "")}`

    // Copy to clipboard for Instagram
    navigator.clipboard.writeText(instagramText).then(() => {
      alert("Instagram caption copied to clipboard! Now generate your certificate and post it with this caption.")
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <GlassmorphismCard className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="space-y-6">
          {/* Certificate Preview */}
          <div
            ref={certificateRef}
            className="relative rounded-lg shadow-2xl"
            style={{
              backgroundImage: `url('/images/certificate-template.png')`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "100%",
              height: "600px",
            }}
          >
            {/* Certificate content is now purely from the background image */}
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                onClick={generateCertificate}
                disabled={isGenerating}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              >
                {isGenerating ? "Generating..." : "📄 Download Certificate"}
              </Button>

              <Button
                onClick={shareOnLinkedIn}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                📎 Share on LinkedIn
              </Button>

              <Button
                onClick={shareOnInstagram}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                📸 Share on Instagram
              </Button>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                💡 Tip: Download your certificate first, then share it on social media!
              </p>
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                Blockchain Verified ✅
              </Badge>
            </div>
          </div>

          <Button variant="outline" onClick={onClose} className="w-full bg-transparent">
            Close
          </Button>
        </div>
      </GlassmorphismCard>
    </div>
  )
}
