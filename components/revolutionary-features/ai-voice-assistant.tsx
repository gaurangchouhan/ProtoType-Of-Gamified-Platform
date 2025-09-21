"use client"

import { useState, useEffect, useRef } from "react"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function AIVoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [emotion, setEmotion] = useState<"happy" | "thinking" | "excited" | "calm">("calm")
  const [conversationHistory, setConversationHistory] = useState<Array<{ type: "user" | "assistant"; text: string }>>(
    [],
  )
  const recognitionRef = useRef<any>(null)

  const vidyaMitraPersonality = {
    name: "Vidya Mitra",
    greeting: "Namaste! I'm Vidya Mitra, your AI learning companion. How can I help you learn today?",
    responses: {
      math: [
        "Mathematics is like a beautiful puzzle! Let me help you solve it step by step.",
        "Numbers are everywhere around us! What mathematical concept would you like to explore?",
        "Great question about math! Let's break this down into smaller, easier parts.",
      ],
      science: [
        "Science is amazing! It helps us understand the world around us. What would you like to discover?",
        "Every scientific discovery starts with curiosity, just like yours! Let's explore together.",
        "Science is everywhere - from the stars above to the soil beneath our feet!",
      ],
      coding: [
        "Coding is like teaching a computer to think! It's creative and logical at the same time.",
        "Programming opens up endless possibilities! What would you like to create today?",
        "Every great programmer started with curiosity, just like you're showing now!",
      ],
      encouragement: [
        "You're doing wonderfully! Every mistake is a step towards learning.",
        "I believe in you! Learning takes time, and you're making great progress.",
        "Your curiosity and questions show that you're a natural learner!",
      ],
      cultural: [
        "India has such a rich tradition of learning and knowledge! Let's explore our heritage together.",
        "From ancient mathematics to modern technology, India has always been a land of learners!",
        "Our ancestors gave the world the concept of zero - imagine the possibilities you can create!",
      ],
    },
  }

  useEffect(() => {
    // Initialize speech recognition
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = "en-IN" // Indian English

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex
        const transcript = event.results[current][0].transcript
        setTranscript(transcript)

        if (event.results[current].isFinal) {
          handleUserInput(transcript)
        }
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }

    // Initial greeting
    setTimeout(() => {
      setResponse(vidyaMitraPersonality.greeting)
      setEmotion("happy")
      speak(vidyaMitraPersonality.greeting)
    }, 1000)
  }, [])

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true)
      setTranscript("")
      setEmotion("thinking")
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const handleUserInput = async (input: string) => {
    setIsThinking(true)
    setEmotion("thinking")

    // Add user input to conversation history
    setConversationHistory((prev) => [...prev, { type: "user", text: input }])

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = generateResponse(input)
      setResponse(aiResponse)
      setConversationHistory((prev) => [...prev, { type: "assistant", text: aiResponse }])
      setIsThinking(false)
      setEmotion("happy")
      speak(aiResponse)
    }, 1500)
  }

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    // Determine response category based on input
    if (lowerInput.includes("math") || lowerInput.includes("number") || lowerInput.includes("calculate")) {
      return vidyaMitraPersonality.responses.math[Math.floor(Math.random() * 3)]
    } else if (lowerInput.includes("science") || lowerInput.includes("experiment") || lowerInput.includes("nature")) {
      return vidyaMitraPersonality.responses.science[Math.floor(Math.random() * 3)]
    } else if (lowerInput.includes("code") || lowerInput.includes("program") || lowerInput.includes("computer")) {
      return vidyaMitraPersonality.responses.coding[Math.floor(Math.random() * 3)]
    } else if (lowerInput.includes("help") || lowerInput.includes("difficult") || lowerInput.includes("hard")) {
      return vidyaMitraPersonality.responses.encouragement[Math.floor(Math.random() * 3)]
    } else if (lowerInput.includes("india") || lowerInput.includes("culture") || lowerInput.includes("tradition")) {
      return vidyaMitraPersonality.responses.cultural[Math.floor(Math.random() * 3)]
    } else {
      return "That's a wonderful question! I'm here to help you learn and grow. What subject interests you most today?"
    }
  }

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "en-IN"
      utterance.rate = 0.9
      utterance.pitch = 1.1
      speechSynthesis.speak(utterance)
    }
  }

  const getEmotionEmoji = () => {
    switch (emotion) {
      case "happy":
        return "😊"
      case "thinking":
        return "🤔"
      case "excited":
        return "🤩"
      default:
        return "😌"
    }
  }

  return (
    <GlassmorphismCard>
      <div className="text-center space-y-6">
        {/* AI Avatar */}
        <div className="relative">
          <div
            className={`text-8xl transition-all duration-500 ${
              isListening ? "animate-pulse" : isThinking ? "animate-bounce" : "animate-float"
            }`}
          >
            {getEmotionEmoji()}
          </div>
          {isListening && (
            <div className="absolute -inset-4 border-4 border-primary rounded-full animate-ping opacity-30" />
          )}
        </div>

        {/* Assistant Info */}
        <div>
          <h3 className="text-2xl font-bold holographic">{vidyaMitraPersonality.name}</h3>
          <p className="text-muted-foreground">Your AI Learning Companion</p>
          <Badge variant="secondary" className="mt-2">
            Emotional Intelligence Enabled
          </Badge>
        </div>

        {/* Current Response */}
        {response && (
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-sm leading-relaxed">{response}</p>
          </div>
        )}

        {/* Voice Controls */}
        <div className="space-y-4">
          {isListening && (
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="text-sm text-primary">Listening... {transcript}</p>
            </div>
          )}

          {isThinking && (
            <div className="p-3 bg-secondary/10 rounded-lg">
              <p className="text-sm text-secondary">Vidya Mitra is thinking...</p>
            </div>
          )}

          <div className="flex space-x-2">
            <Button
              onClick={isListening ? stopListening : startListening}
              disabled={isThinking}
              className={`flex-1 ${isListening ? "bg-red-500 hover:bg-red-600" : "animate-glow"}`}
            >
              {isListening ? "Stop Listening" : "🎤 Talk to Vidya Mitra"}
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleUserInput("Help me with math")}
            className="bg-transparent"
          >
            📊 Math Help
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleUserInput("Tell me about science")}
            className="bg-transparent"
          >
            🔬 Science Facts
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleUserInput("I need encouragement")}
            className="bg-transparent"
          >
            💪 Motivation
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleUserInput("Tell me about Indian culture")}
            className="bg-transparent"
          >
            🏛️ Culture
          </Button>
        </div>

        {/* Conversation History */}
        {conversationHistory.length > 0 && (
          <div className="max-h-32 overflow-y-auto space-y-2 text-left">
            <h4 className="text-sm font-medium text-center">Recent Conversation</h4>
            {conversationHistory.slice(-4).map((msg, index) => (
              <div
                key={index}
                className={`text-xs p-2 rounded ${msg.type === "user" ? "bg-primary/10 ml-4" : "bg-secondary/10 mr-4"}`}
              >
                <strong>{msg.type === "user" ? "You" : "Vidya Mitra"}:</strong> {msg.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </GlassmorphismCard>
  )
}
