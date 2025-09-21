"use client"

import { useLanguage } from "@/components/accessibility/language-provider"

export function SkipLink() {
  const { t } = useLanguage()

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg"
    >
      {t("skip_to_content")}
    </a>
  )
}
