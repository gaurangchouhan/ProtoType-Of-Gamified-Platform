"use client"

import { ProgressRing } from "@/components/ui/progress-ring"

interface EnvironmentData {
  trees: number
  pollution: number
  aqi: number
  animals: number
}

interface EnvironmentVisualizerProps {
  data: EnvironmentData
  target: EnvironmentData
}

export function EnvironmentVisualizer({ data, target }: EnvironmentVisualizerProps) {
  const getHealthColor = (current: number, target: number, inverse = false) => {
    const ratio = inverse ? (100 - current) / (100 - target) : current / target
    if (ratio >= 1) return "#22c55e" // Green
    if (ratio >= 0.7) return "#f59e0b" // Yellow
    return "#ef4444" // Red
  }

  return (
    <div className="space-y-6">
      {/* Environment Visualization */}
      <div className="text-center p-6 bg-gradient-to-b from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg">
        <div className="text-6xl mb-4">{data.pollution > 70 ? "🏭" : data.pollution > 40 ? "🌫️" : "🌤️"}</div>
        <div className="flex justify-center space-x-4 text-4xl">
          {Array.from({ length: Math.min(data.trees, 8) }, (_, i) => (
            <span key={i} className="animate-float" style={{ animationDelay: `${i * 0.2}s` }}>
              🌳
            </span>
          ))}
        </div>
        <div className="flex justify-center space-x-2 mt-4 text-2xl">
          {Array.from({ length: Math.min(data.animals, 6) }, (_, i) => (
            <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.3}s` }}>
              {i % 3 === 0 ? "🐰" : i % 3 === 1 ? "🦋" : "🐦"}
            </span>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <ProgressRing
            progress={(data.trees / target.trees) * 100}
            size={80}
            strokeWidth={6}
            className="mx-auto mb-2"
          />
          <p className="font-medium">Trees</p>
          <p className="text-sm text-muted-foreground">
            {data.trees}/{target.trees}
          </p>
        </div>

        <div className="text-center">
          <ProgressRing
            progress={Math.max(0, 100 - (data.pollution / target.pollution) * 100)}
            size={80}
            strokeWidth={6}
            className="mx-auto mb-2"
          />
          <p className="font-medium">Pollution</p>
          <p className="text-sm text-muted-foreground">
            {data.pollution}% (Target: ≤{target.pollution}%)
          </p>
        </div>

        <div className="text-center">
          <ProgressRing
            progress={Math.max(0, 100 - (data.aqi / target.aqi) * 100)}
            size={80}
            strokeWidth={6}
            className="mx-auto mb-2"
          />
          <p className="font-medium">Air Quality</p>
          <p className="text-sm text-muted-foreground">
            AQI: {data.aqi} (Target: ≤{target.aqi})
          </p>
        </div>

        <div className="text-center">
          <ProgressRing
            progress={(data.animals / target.animals) * 100}
            size={80}
            strokeWidth={6}
            className="mx-auto mb-2"
          />
          <p className="font-medium">Wildlife</p>
          <p className="text-sm text-muted-foreground">
            {data.animals}/{target.animals} species
          </p>
        </div>
      </div>
    </div>
  )
}
