"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoginInterface } from "@/components/login-interface"
import { useAuth } from "@/lib/auth"

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  // Show login interface if not authenticated
  if (!isAuthenticated) {
    return <LoginInterface />
  }

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Redirecting to dashboard...</p>
      </div>
    </div>
  )
}
