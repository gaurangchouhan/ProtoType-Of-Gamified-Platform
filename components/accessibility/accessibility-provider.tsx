"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface AccessibilitySettings {
  highContrast: boolean
  largeText: boolean
  reducedMotion: boolean
  screenReader: boolean
  keyboardNavigation: boolean
  focusIndicators: boolean
}

interface AccessibilityContextType {
  settings: AccessibilitySettings
  updateSetting: (key: keyof AccessibilitySettings, value: boolean) => void
  announceToScreenReader: (message: string) => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    focusIndicators: true,
  })

  useEffect(() => {
    // Load saved accessibility settings
    const savedSettings = localStorage.getItem("gramquest-accessibility")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }

    // Detect system preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const prefersHighContrast = window.matchMedia("(prefers-contrast: high)").matches

    if (prefersReducedMotion || prefersHighContrast) {
      setSettings((prev) => ({
        ...prev,
        reducedMotion: prefersReducedMotion,
        highContrast: prefersHighContrast,
      }))
    }
  }, [])

  useEffect(() => {
    // Apply accessibility settings to document
    const root = document.documentElement

    if (settings.highContrast) {
      root.classList.add("high-contrast")
    } else {
      root.classList.remove("high-contrast")
    }

    if (settings.largeText) {
      root.classList.add("large-text")
    } else {
      root.classList.remove("large-text")
    }

    if (settings.reducedMotion) {
      root.classList.add("reduced-motion")
    } else {
      root.classList.remove("reduced-motion")
    }

    if (settings.focusIndicators) {
      root.classList.add("focus-indicators")
    } else {
      root.classList.remove("focus-indicators")
    }

    // Save settings
    localStorage.setItem("gramquest-accessibility", JSON.stringify(settings))
  }, [settings])

  const updateSetting = (key: keyof AccessibilitySettings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement("div")
    announcement.setAttribute("aria-live", "polite")
    announcement.setAttribute("aria-atomic", "true")
    announcement.className = "sr-only"
    announcement.textContent = message
    document.body.appendChild(announcement)

    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  return (
    <AccessibilityContext.Provider value={{ settings, updateSetting, announceToScreenReader }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider")
  }
  return context
}
