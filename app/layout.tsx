import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { LanguageProvider } from "@/components/accessibility/language-provider"
import { AccessibilityProvider } from "@/components/accessibility/accessibility-provider"
import { SkipLink } from "@/components/accessibility/skip-link"
import { Suspense } from "react"

// export const metadata: Metadata = {
//   title: "v0 App",
//   description: "Created with v0",
//   generator: "v0.app",
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <LanguageProvider>
            <AccessibilityProvider>
              <SkipLink />
              <main id="main-content">{children}</main>
              <Analytics />
            </AccessibilityProvider>
          </LanguageProvider>
        </Suspense>
      </body>
    </html>
  )
}
