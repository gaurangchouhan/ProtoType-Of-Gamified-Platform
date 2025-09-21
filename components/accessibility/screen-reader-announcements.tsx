"use client"

import { useEffect } from "react"
import { useAccessibility } from "@/components/accessibility/accessibility-provider"

interface ScreenReaderAnnouncementsProps {
  message?: string
  type?: "polite" | "assertive"
}

export function ScreenReaderAnnouncements({ message, type = "polite" }: ScreenReaderAnnouncementsProps) {
  const { announceToScreenReader } = useAccessibility()

  useEffect(() => {
    if (message) {
      announceToScreenReader(message)
    }
  }, [message, announceToScreenReader])

  return (
    <div
      aria-live={type}
      aria-atomic="true"
      className="sr-only"
      role="status"
      aria-label="Screen reader announcements"
    />
  )
}
