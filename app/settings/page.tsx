import { AccessibilitySettings } from "@/components/accessibility/accessibility-settings"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="p-6 border-b border-border/50">
        <h1 className="text-3xl font-bold holographic text-center">Settings</h1>
      </header>
      <div className="p-6">
        <AccessibilitySettings />
      </div>
    </div>
  )
}
