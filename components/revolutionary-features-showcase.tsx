"use client"

import { useState } from "react"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"
import { FloatingParticles } from "@/components/ui/floating-particles"
import { ARLearningModule } from "@/components/revolutionary-features/ar-learning-module"
import { AIVoiceAssistant } from "@/components/revolutionary-features/ai-voice-assistant"
import { BlockchainAchievements } from "@/components/revolutionary-features/blockchain-achievements"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function RevolutionaryFeatures() {
  const [selectedSubject, setSelectedSubject] = useState("mathematics")
  const [selectedLesson, setSelectedLesson] = useState("3D Geometry")

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingParticles count={25} />

      {/* Header */}
      <header className="p-6 border-b border-border/50">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold holographic">Revolutionary Features</h1>
          <p className="text-lg text-muted-foreground">
            Experience the future of education with AR, AI, and Blockchain technology
          </p>
        </div>
      </header>

      <div className="p-6 space-y-8">
        {/* Feature Showcase */}
        <Tabs defaultValue="ar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 glassmorphism">
            <TabsTrigger value="ar" className="flex items-center space-x-2">
              <span>🥽</span>
              <span>AR Learning</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center space-x-2">
              <span>🤖</span>
              <span>AI Assistant</span>
            </TabsTrigger>
            <TabsTrigger value="blockchain" className="flex items-center space-x-2">
              <span>⛓️</span>
              <span>Blockchain</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ar" className="space-y-6">
            <GlassmorphismCard>
              <h2 className="text-2xl font-bold mb-4 text-center">Augmented Reality Learning</h2>
              <p className="text-muted-foreground text-center mb-6">
                Bring learning to life by placing 3D educational content in your real environment
              </p>

              {/* Subject and Lesson Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full p-2 border border-border rounded-lg bg-background"
                  >
                    <option value="mathematics">Mathematics</option>
                    <option value="science">Science</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Lesson</label>
                  <select
                    value={selectedLesson}
                    onChange={(e) => setSelectedLesson(e.target.value)}
                    className="w-full p-2 border border-border rounded-lg bg-background"
                  >
                    {selectedSubject === "mathematics" ? (
                      <>
                        <option value="3D Geometry">3D Geometry</option>
                        <option value="Fractions">Fractions</option>
                      </>
                    ) : (
                      <>
                        <option value="Solar System">Solar System</option>
                        <option value="Human Body">Human Body</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
            </GlassmorphismCard>

            <ARLearningModule subject={selectedSubject} lesson={selectedLesson} />
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <GlassmorphismCard>
              <h2 className="text-2xl font-bold mb-4 text-center">AI Voice Assistant</h2>
              <p className="text-muted-foreground text-center mb-6">
                Meet Vidya Mitra, your emotionally intelligent AI companion that understands and responds to your
                learning needs
              </p>
            </GlassmorphismCard>

            <AIVoiceAssistant />
          </TabsContent>

          <TabsContent value="blockchain" className="space-y-6">
            <GlassmorphismCard>
              <h2 className="text-2xl font-bold mb-4 text-center">Blockchain Achievements</h2>
              <p className="text-muted-foreground text-center mb-6">
                Your educational achievements are permanently recorded on the blockchain, creating tamper-proof
                credentials that are recognized globally
              </p>
            </GlassmorphismCard>

            <BlockchainAchievements />
          </TabsContent>
        </Tabs>

        {/* Feature Benefits */}
        <GlassmorphismCard>
          <h3 className="text-xl font-bold mb-6 text-center">Why These Features Matter</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="text-4xl animate-float">🎯</div>
              <h4 className="font-semibold">Immersive Learning</h4>
              <p className="text-sm text-muted-foreground">
                AR technology makes abstract concepts tangible and interactive, improving understanding and retention
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="text-4xl animate-bounce">🧠</div>
              <h4 className="font-semibold">Personalized Support</h4>
              <p className="text-sm text-muted-foreground">
                AI assistant adapts to your learning style and provides emotional support throughout your educational
                journey
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="text-4xl animate-glow">🏆</div>
              <h4 className="font-semibold">Verified Credentials</h4>
              <p className="text-sm text-muted-foreground">
                Blockchain verification ensures your achievements are permanent, portable, and globally recognized
              </p>
            </div>
          </div>
        </GlassmorphismCard>
      </div>
    </div>
  )
}
