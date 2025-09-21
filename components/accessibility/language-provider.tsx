"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import type { Language, TranslationKey } from "@/lib/i18n"
import { getTranslation, languages } from "@/lib/i18n"

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (language: Language) => void
  t: (key: TranslationKey, params?: Record<string, string>) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en")

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("gramquest-language") as Language
    if (savedLanguage && languages.find((lang) => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language)
    localStorage.setItem("gramquest-language", language)

    // Update document language and direction
    document.documentElement.lang = language
    const languageInfo = languages.find((lang) => lang.code === language)
    document.documentElement.dir = languageInfo?.rtl ? "rtl" : "ltr"
  }

  const t = (key: TranslationKey, params?: Record<string, string>) => {
    return getTranslation(currentLanguage, key, params)
  }

  const isRTL = languages.find((lang) => lang.code === currentLanguage)?.rtl || false

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, isRTL }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
