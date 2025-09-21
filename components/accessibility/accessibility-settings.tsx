"use client"

import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useAccessibility } from "@/components/accessibility/accessibility-provider"
import { useLanguage } from "@/components/accessibility/language-provider"
import { languages } from "@/lib/i18n"

export function AccessibilitySettings() {
  const { settings, updateSetting } = useAccessibility()
  const { currentLanguage, setLanguage, t } = useLanguage()

  return (
    <div className="space-y-6">
      {/* Language Settings */}
      <GlassmorphismCard>
        <h3 className="text-xl font-bold mb-4">Language / भाषा / ভাষা</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {languages.map((language) => (
            <Button
              key={language.code}
              variant={currentLanguage === language.code ? "default" : "outline"}
              onClick={() => setLanguage(language.code as any)}
              className="flex items-center space-x-2 h-auto p-3 bg-transparent"
            >
              <span className="text-lg">{language.flag}</span>
              <div className="text-left">
                <div className="font-medium text-sm">{language.nativeName}</div>
                <div className="text-xs opacity-70">{language.name}</div>
              </div>
            </Button>
          ))}
        </div>
      </GlassmorphismCard>

      {/* Accessibility Settings */}
      <GlassmorphismCard>
        <h3 className="text-xl font-bold mb-4">Accessibility Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">High Contrast Mode</h4>
              <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
            </div>
            <Switch
              checked={settings.highContrast}
              onCheckedChange={(checked) => updateSetting("highContrast", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Large Text</h4>
              <p className="text-sm text-muted-foreground">Increase text size for easier reading</p>
            </div>
            <Switch checked={settings.largeText} onCheckedChange={(checked) => updateSetting("largeText", checked)} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Reduced Motion</h4>
              <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
            </div>
            <Switch
              checked={settings.reducedMotion}
              onCheckedChange={(checked) => updateSetting("reducedMotion", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Enhanced Focus Indicators</h4>
              <p className="text-sm text-muted-foreground">Improve keyboard navigation visibility</p>
            </div>
            <Switch
              checked={settings.focusIndicators}
              onCheckedChange={(checked) => updateSetting("focusIndicators", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Screen Reader Optimizations</h4>
              <p className="text-sm text-muted-foreground">Enhanced support for assistive technologies</p>
            </div>
            <Switch
              checked={settings.screenReader}
              onCheckedChange={(checked) => updateSetting("screenReader", checked)}
            />
          </div>
        </div>
      </GlassmorphismCard>

      {/* Keyboard Shortcuts */}
      <GlassmorphismCard>
        <h3 className="text-xl font-bold mb-4">Keyboard Shortcuts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Navigate to Dashboard</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Alt + D</kbd>
            </div>
            <div className="flex justify-between">
              <span>Open Games</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Alt + G</kbd>
            </div>
            <div className="flex justify-between">
              <span>View Profile</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Alt + P</kbd>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Open Settings</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Alt + S</kbd>
            </div>
            <div className="flex justify-between">
              <span>Toggle Menu</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Alt + M</kbd>
            </div>
            <div className="flex justify-between">
              <span>Search</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl + K</kbd>
            </div>
          </div>
        </div>
      </GlassmorphismCard>

      {/* Voice Navigation */}
      <GlassmorphismCard>
        <h3 className="text-xl font-bold mb-4">Voice Navigation</h3>
        <p className="text-muted-foreground mb-4">
          Use voice commands to navigate GramQuest. Say "Hey Vidya" followed by your command.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div>"Go to dashboard"</div>
            <div>"Open games"</div>
            <div>"Start learning"</div>
            <div>"Show my progress"</div>
          </div>
          <div className="space-y-2">
            <div>"Read this page"</div>
            <div>"What can I do here?"</div>
            <div>"Help me learn math"</div>
            <div>"Change language"</div>
          </div>
        </div>
      </GlassmorphismCard>
    </div>
  )
}
