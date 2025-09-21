import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GlassmorphismCardProps {
  children: ReactNode
  className?: string
  glow?: boolean
}

export function GlassmorphismCard({ children, className, glow = false }: GlassmorphismCardProps) {
  return (
    <div
      className={cn(
        "glassmorphism bg-card/80 backdrop-blur-md rounded-xl p-6 shadow-lg",
        glow && "animate-glow",
        className,
      )}
    >
      {children}
    </div>
  )
}
