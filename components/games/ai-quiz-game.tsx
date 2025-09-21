"use client"

import { useState, useEffect } from "react"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"
import { FloatingParticles } from "@/components/ui/floating-particles"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProgressRing } from "@/components/ui/progress-ring"

const quizQuestions = [
  {
    id: 1,
    category: "Mathematics",
    question: "What is 15 × 8?",
    options: ["120", "125", "115", "130"],
    correct: 0,
    difficulty: "Easy",
    points: 10,
  },
  {
    id: 2,
    category: "Science",
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1,
    difficulty: "Easy",
    points: 10,
  },
  {
    id: 3,
    category: "History",
    question: "Who was the first Prime Minister of India?",
    options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel", "Dr. APJ Abdul Kalam"],
    correct: 1,
    difficulty: "Medium",
    points: 20,
  },
  {
    id: 4,
    category: "Geography",
    question: "Which is the longest river in India?",
    options: ["Yamuna", "Narmada", "Ganga", "Godavari"],
    correct: 2,
    difficulty: "Medium",
    points: 20,
  },
  {
    id: 5,
    category: "Technology",
    question: "What does AI stand for?",
    options: ["Automated Intelligence", "Artificial Intelligence", "Advanced Integration", "Algorithmic Interface"],
    correct: 1,
    difficulty: "Easy",
    points: 10,
  },
]

const powerUps = [
  { id: "fifty-fifty", name: "50-50", description: "Remove 2 wrong answers", icon: "🎯", cost: 1 },
  { id: "time-freeze", name: "Time Freeze", description: "Stop the timer for 10 seconds", icon: "⏰", cost: 2 },
  { id: "steal", name: "Steal Points", description: "Steal 50% of opponent's points", icon: "💰", cost: 3 },
]

export function AIQuizGame() {
  const [gameState, setGameState] = useState<"menu" | "playing" | "results">("menu")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [aiScore, setAiScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [round, setRound] = useState(1)
  const [totalRounds] = useState(5)
  const [powerUpCount, setPowerUpCount] = useState(3)
  const [usedPowerUps, setUsedPowerUps] = useState<string[]>([])
  const [showAnswer, setShowAnswer] = useState(false)
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([])

  const question = quizQuestions[currentQuestion]

  const usePowerUp = (powerUpId: string) => {
    if (usedPowerUps.includes(powerUpId) || powerUpCount <= 0) return

    setUsedPowerUps((prev) => [...prev, powerUpId])
    setPowerUpCount((prev) => prev - 1)

    switch (powerUpId) {
      case "fifty-fifty":
        const wrongAnswers = question.options.map((_, index) => index).filter((index) => index !== question.correct)
        const toEliminate = wrongAnswers.slice(0, 2)
        setEliminatedOptions(toEliminate)
        break
      case "time-freeze":
        setTimeout(() => {
          setTimeLeft((prev) => prev + 10)
        }, 100)
        break
      case "steal":
        const stolenPoints = Math.floor(aiScore * 0.5)
        setScore((prev) => prev + stolenPoints)
        setAiScore((prev) => prev - stolenPoints)
        break
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameState === "playing" && timeLeft > 0 && !showAnswer) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && !showAnswer) {
      handleTimeUp()
    }
    return () => clearInterval(timer)
  }, [gameState, timeLeft, showAnswer])

  const startGame = () => {
    setGameState("playing")
    setCurrentQuestion(0)
    setScore(0)
    setAiScore(0)
    setRound(1)
    setTimeLeft(30)
    setPowerUpCount(3)
    setUsedPowerUps([])
    setEliminatedOptions([])
  }

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null || showAnswer) return

    setSelectedAnswer(answerIndex)
    setShowAnswer(true)

    const isCorrect = answerIndex === question.correct
    const timeBonus = Math.floor(timeLeft / 3)
    const points = isCorrect ? question.points + timeBonus : 0

    setScore((prev) => prev + points)

    // AI opponent logic (simulated)
    const aiCorrectChance = 0.7 - round * 0.1 // AI gets slightly worse each round
    const aiIsCorrect = Math.random() < aiCorrectChance
    const aiPoints = aiIsCorrect ? question.points + Math.floor(Math.random() * 10) : 0
    setAiScore((prev) => prev + aiPoints)

    setTimeout(() => {
      nextQuestion()
    }, 3000)
  }

  const handleTimeUp = () => {
    setShowAnswer(true)
    // AI still gets a chance when time runs out
    const aiPoints = Math.random() < 0.5 ? question.points : 0
    setAiScore((prev) => prev + aiPoints)

    setTimeout(() => {
      nextQuestion()
    }, 2000)
  }

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowAnswer(false)
      setTimeLeft(30)
      setRound((prev) => prev + 1)
      setEliminatedOptions([])
    } else {
      setGameState("results")
    }
  }

  if (gameState === "menu") {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
        <FloatingParticles count={20} />
        <GlassmorphismCard className="text-center space-y-6 max-w-md">
          <div className="text-6xl animate-bounce">🎮</div>
          <h1 className="text-3xl font-bold holographic">AI Quiz Duel</h1>
          <p className="text-muted-foreground">Challenge the AI in a fast-paced quiz battle!</p>
          <div className="space-y-2 text-sm">
            <p>• {totalRounds} rounds of questions</p>
            <p>• 30 seconds per question</p>
            <p>• Use power-ups strategically</p>
            <p>• Beat the AI to win!</p>
          </div>
          <Button onClick={startGame} className="w-full animate-glow">
            Start Quiz Duel
          </Button>
        </GlassmorphismCard>
      </div>
    )
  }

  if (gameState === "results") {
    const playerWon = score > aiScore
    return (
      <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
        <FloatingParticles count={30} />
        <GlassmorphismCard className="text-center space-y-6 max-w-md">
          <div className="text-6xl">{playerWon ? "🏆" : "🤖"}</div>
          <h2 className="text-2xl font-bold holographic">{playerWon ? "Victory!" : "AI Wins!"}</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Your Score:</span>
              <Badge variant="secondary" className="text-lg">
                {score}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>AI Score:</span>
              <Badge variant="outline" className="text-lg">
                {aiScore}
              </Badge>
            </div>
          </div>
          <div className="space-y-2">
            <Button onClick={startGame} className="w-full">
              Play Again
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              Back to Games
            </Button>
          </div>
        </GlassmorphismCard>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingParticles count={15} />

      {/* Header */}
      <header className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Badge variant="secondary">
              Round {round}/{totalRounds}
            </Badge>
            <Badge variant="outline">{question.category}</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">You</p>
              <p className="text-xl font-bold text-primary">{score}</p>
            </div>
            <div className="text-2xl">VS</div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">AI</p>
              <p className="text-xl font-bold text-secondary">{aiScore}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Timer and Power-ups */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <ProgressRing progress={(timeLeft / 30) * 100} size={80} strokeWidth={6} />
            <div>
              <p className="text-sm text-muted-foreground">Time Left</p>
              <p className="text-2xl font-bold">{timeLeft}s</p>
            </div>
          </div>
          <div className="flex space-x-2">
            {powerUps.map((powerUp) => (
              <Button
                key={powerUp.id}
                variant="outline"
                size="sm"
                onClick={() => usePowerUp(powerUp.id)}
                disabled={usedPowerUps.includes(powerUp.id) || powerUpCount <= 0}
                className="flex flex-col items-center p-2 h-auto bg-transparent"
                title={powerUp.description}
              >
                <span className="text-lg">{powerUp.icon}</span>
                <span className="text-xs">{powerUp.name}</span>
              </Button>
            ))}
            <Badge variant="secondary">Power-ups: {powerUpCount}</Badge>
          </div>
        </div>

        {/* Question */}
        <GlassmorphismCard>
          <div className="text-center space-y-6">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline">{question.difficulty}</Badge>
              <Badge variant="secondary">{question.points} points</Badge>
            </div>
            <h2 className="text-2xl font-bold text-balance">{question.question}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, index) => {
                const isEliminated = eliminatedOptions.includes(index)
                const isSelected = selectedAnswer === index
                const isCorrect = index === question.correct
                const showResult = showAnswer

                return (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleAnswer(index)}
                    disabled={showAnswer || isEliminated}
                    className={`p-4 h-auto text-left transition-all duration-300 ${
                      isEliminated
                        ? "opacity-30 cursor-not-allowed"
                        : showResult
                          ? isCorrect
                            ? "bg-green-500/20 border-green-500"
                            : isSelected
                              ? "bg-red-500/20 border-red-500"
                              : "bg-transparent"
                          : "bg-transparent hover:bg-primary/10"
                    }`}
                  >
                    <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                    {showResult && isCorrect && <span className="ml-2">✅</span>}
                    {showResult && isSelected && !isCorrect && <span className="ml-2">❌</span>}
                  </Button>
                )
              })}
            </div>
            {showAnswer && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {selectedAnswer === question.correct ? "Correct! Well done!" : "Incorrect. Better luck next time!"}
                </p>
              </div>
            )}
          </div>
        </GlassmorphismCard>
      </div>
    </div>
  )
}
