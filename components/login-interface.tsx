"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"
import { FloatingParticles } from "@/components/ui/floating-particles"
import { AnimatedText } from "@/components/ui/animated-text"
import { LanguageToggle } from "@/components/ui/language-toggle"
import { AvatarCreator } from "@/components/ui/avatar-creator"
import { BiometricLogin } from "@/components/ui/biometric-login"
import { useAuth, getRoleBasedDashboard } from "@/lib/auth"
import { Loader2 } from "lucide-react"

const inspirationalQuotes = [
  "Education is the most powerful weapon which you can use to change the world. - Nelson Mandela",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "Innovation distinguishes between a leader and a follower. - Steve Jobs",
]

export function LoginInterface() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [selectedRole, setSelectedRole] = useState<"student" | "teacher" | "parent">("student")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()
  const router = useRouter()

  useState(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % inspirationalQuotes.length)
    }, 5000)
    return () => clearInterval(interval)
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await login(email, password, isSignUp ? name : undefined, selectedRole)

      if (success) {
        router.push(getRoleBasedDashboard(selectedRole))
      } else {
        setError(isSignUp ? "Failed to create account" : "Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async (role: "student" | "teacher" | "parent") => {
    const demoCredentials = {
      student: { email: "demo@gramquest.com", password: "demo123" },
      teacher: { email: "teacher@gramquest.com", password: "teacher123" },
      parent: { email: "parent@gramquest.com", password: "parent123" },
    }

    const { email: demoEmail, password: demoPassword } = demoCredentials[role]
    setEmail(demoEmail)
    setPassword(demoPassword)
    setSelectedRole(role)
    setIsLoading(true)
    setError("")

    try {
      const success = await login(demoEmail, demoPassword, undefined, role)
      if (success) {
        router.push(getRoleBasedDashboard(role))
      }
    } catch (err) {
      setError("Demo login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <FloatingParticles count={30} />

      {/* Left Side - Inspirational Content (40% width) */}
      <div className="w-2/5 relative flex flex-col justify-center items-center p-8 bg-gradient-to-br from-primary via-secondary to-accent">
        {/* Animated geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-float" />
          <div
            className="absolute bottom-32 right-16 w-24 h-24 bg-white/10 rounded-lg animate-float"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4 animate-shimmer text-white">
            <AnimatedText text="GramQuest" className="text-white font-bold" />
          </h1>
          <p className="text-xl mb-8 text-white/90">
            <AnimatedText text="Empowering Rural India Through Innovation" delay={30} className="text-white/90" />
          </p>

          {/* Rotating inspirational quotes */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 max-w-md border border-white/20">
            <p className="text-sm italic leading-relaxed text-white">{inspirationalQuotes[currentQuote]}</p>
          </div>

          {/* Village-themed illustrations */}
          <div className="mt-8 flex justify-center space-x-4">
            <div className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center animate-float border border-white/20">
              <span className="text-2xl">🏫</span>
            </div>
            <div
              className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center animate-float border border-white/20"
              style={{ animationDelay: "0.5s" }}
            >
              <span className="text-2xl">📚</span>
            </div>
            <div
              className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center animate-float border border-white/20"
              style={{ animationDelay: "1s" }}
            >
              <span className="text-2xl">🌱</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form (60% width) */}
      <div className="w-3/5 flex items-center justify-center p-8 relative bg-slate-900/50">
        <div className="w-full max-w-md">
          <div className="mb-6 flex justify-end">
            <LanguageToggle />
          </div>

          <GlassmorphismCard glow className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold holographic mb-2">{isSignUp ? "Join GramQuest" : "Welcome Back"}</h2>
              <p className="text-muted-foreground">
                {isSignUp ? "Start your learning adventure" : "Continue your learning journey"}
              </p>
            </div>

            {isSignUp && (
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">I am a:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["student", "teacher", "parent"] as const).map((role) => (
                    <Button
                      key={role}
                      type="button"
                      variant={selectedRole === role ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedRole(role)}
                      className="capitalize"
                    >
                      {role}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {!isSignUp && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground text-center">Try Demo Login:</p>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    onClick={() => handleDemoLogin("student")}
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                    disabled={isLoading}
                  >
                    Student
                  </Button>
                  <Button
                    onClick={() => handleDemoLogin("teacher")}
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                    disabled={isLoading}
                  >
                    Teacher
                  </Button>
                  <Button
                    onClick={() => handleDemoLogin("parent")}
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                    disabled={isLoading}
                  >
                    Parent
                  </Button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="glassmorphism"
                    required
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glassmorphism"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2 text-foreground">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glassmorphism"
                  required
                />
              </div>

              {error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</div>}

              <Button type="submit" className="w-full animate-glow" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isSignUp ? "Creating Account..." : "Signing In..."}
                  </>
                ) : isSignUp ? (
                  "Create Account"
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <BiometricLogin />

            {isSignUp && <AvatarCreator />}

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary hover:underline text-sm"
                disabled={isLoading}
              >
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </button>
            </div>
          </GlassmorphismCard>
        </div>
      </div>
    </div>
  )
}
