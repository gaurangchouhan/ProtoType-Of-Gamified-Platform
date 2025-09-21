"use client"

import { useState, useRef, useEffect } from "react"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ARLearningModuleProps {
  subject: string
  lesson: string
}

export function ARLearningModule({ subject, lesson }: ARLearningModuleProps) {
  const [isARActive, setIsARActive] = useState(false)
  const [cameraPermission, setCameraPermission] = useState<"granted" | "denied" | "pending">("pending")
  const [arObjects, setArObjects] = useState<any[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const arLessons = {
    mathematics: {
      "3D Geometry": {
        objects: ["cube", "sphere", "pyramid", "cylinder"],
        interactions: ["rotate", "scale", "measure"],
        description: "Explore 3D shapes in your real environment",
      },
      Fractions: {
        objects: ["pizza_slices", "cake_pieces", "fruit_parts"],
        interactions: ["combine", "divide", "compare"],
        description: "Visualize fractions with real objects",
      },
    },
    science: {
      "Solar System": {
        objects: ["sun", "planets", "asteroids", "comets"],
        interactions: ["orbit", "zoom", "info"],
        description: "Place the solar system in your room",
      },
      "Human Body": {
        objects: ["skeleton", "organs", "muscles", "nerves"],
        interactions: ["x-ray", "layer", "animate"],
        description: "Explore anatomy in 3D space",
      },
    },
  }

  const currentLesson = arLessons[subject as keyof typeof arLessons]?.[lesson] || arLessons.mathematics["3D Geometry"]

  useEffect(() => {
    if (isARActive) {
      startCamera()
    } else {
      stopCamera()
    }
  }, [isARActive])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
      setCameraPermission("granted")
      initializeAR()
    } catch (error) {
      console.error("Camera access denied:", error)
      setCameraPermission("denied")
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
  }

  const initializeAR = () => {
    // Simulate AR object placement
    const objects = currentLesson.objects.map((obj, index) => ({
      id: index,
      type: obj,
      x: Math.random() * 300 + 50,
      y: Math.random() * 200 + 100,
      scale: 1,
      rotation: 0,
      visible: true,
    }))
    setArObjects(objects)
  }

  const handleObjectInteraction = (objectId: number, interaction: string) => {
    setArObjects((prev) =>
      prev.map((obj) => {
        if (obj.id === objectId) {
          switch (interaction) {
            case "rotate":
              return { ...obj, rotation: (obj.rotation + 45) % 360 }
            case "scale":
              return { ...obj, scale: obj.scale === 1 ? 1.5 : 1 }
            case "measure":
              // Show measurement overlay
              return obj
            default:
              return obj
          }
        }
        return obj
      }),
    )
  }

  const getObjectEmoji = (type: string) => {
    const emojis: { [key: string]: string } = {
      cube: "🟦",
      sphere: "🔵",
      pyramid: "🔺",
      cylinder: "🥫",
      pizza_slices: "🍕",
      cake_pieces: "🍰",
      fruit_parts: "🍎",
      sun: "☀️",
      planets: "🪐",
      asteroids: "☄️",
      comets: "💫",
      skeleton: "🦴",
      organs: "❤️",
      muscles: "💪",
      nerves: "🧠",
    }
    return emojis[type] || "📦"
  }

  if (!isARActive) {
    return (
      <GlassmorphismCard>
        <div className="text-center space-y-6">
          <div className="text-6xl animate-float">🥽</div>
          <h3 className="text-2xl font-bold holographic">AR Learning Module</h3>
          <p className="text-muted-foreground">{currentLesson.description}</p>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Available Objects:</h4>
              <div className="flex justify-center space-x-2">
                {currentLesson.objects.map((obj, index) => (
                  <div key={index} className="text-2xl animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                    {getObjectEmoji(obj)}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Interactions:</h4>
              <div className="flex justify-center space-x-2">
                {currentLesson.interactions.map((interaction, index) => (
                  <Badge key={index} variant="outline" className="capitalize">
                    {interaction}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Button onClick={() => setIsARActive(true)} className="w-full animate-glow">
            Start AR Experience
          </Button>

          <div className="text-xs text-muted-foreground">
            Note: This requires camera access to overlay 3D objects in your environment
          </div>
        </div>
      </GlassmorphismCard>
    )
  }

  return (
    <GlassmorphismCard className="relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">AR Learning: {lesson}</h3>
        <Button variant="outline" onClick={() => setIsARActive(false)} className="bg-transparent">
          Exit AR
        </Button>
      </div>

      {cameraPermission === "denied" ? (
        <div className="text-center space-y-4">
          <div className="text-4xl">📷</div>
          <p className="text-muted-foreground">Camera access is required for AR features</p>
          <Button onClick={() => setIsARActive(false)} variant="outline">
            Go Back
          </Button>
        </div>
      ) : (
        <div className="relative">
          {/* Camera Feed */}
          <video ref={videoRef} className="w-full h-64 bg-black rounded-lg object-cover" playsInline muted autoPlay />

          {/* AR Overlay Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-64 pointer-events-none"
            width={640}
            height={480}
          />

          {/* AR Objects Overlay */}
          <div className="absolute inset-0">
            {arObjects.map((obj) => (
              <div
                key={obj.id}
                className="absolute cursor-pointer transition-all duration-300 hover:scale-110"
                style={{
                  left: `${obj.x}px`,
                  top: `${obj.y}px`,
                  transform: `scale(${obj.scale}) rotate(${obj.rotation}deg)`,
                }}
                onClick={() => handleObjectInteraction(obj.id, "rotate")}
              >
                <div className="text-4xl animate-float bg-white/20 backdrop-blur-sm rounded-full p-2">
                  {getObjectEmoji(obj.type)}
                </div>
              </div>
            ))}
          </div>

          {/* AR Controls */}
          <div className="mt-4 flex justify-center space-x-2">
            {currentLesson.interactions.map((interaction, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => arObjects.forEach((obj) => handleObjectInteraction(obj.id, interaction))}
                className="capitalize bg-transparent"
              >
                {interaction}
              </Button>
            ))}
          </div>
        </div>
      )}
    </GlassmorphismCard>
  )
}
