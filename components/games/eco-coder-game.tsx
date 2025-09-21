"use client"

import { useState, useEffect } from "react"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"
import { FloatingParticles } from "@/components/ui/floating-particles"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CodeEditor } from "@/components/ui/code-editor"
import { EnvironmentVisualizer } from "@/components/ui/environment-visualizer"

const missions = [
  {
    id: 1,
    title: "Clean the Park",
    description: "Use functions to clean up litter in the park",
    difficulty: "Beginner",
    initialCode: `// Mission: Clean the Park
// Use the PlantTree() function to restore nature

function cleanPark() {
  // Your code here
  
}

cleanPark();`,
    solution: `function cleanPark() {
  PlantTree();
  PlantTree();
  RemoveLitter();
  PlantTree();
}`,
    environmentData: {
      trees: 2,
      pollution: 80,
      aqi: 150,
      animals: 1,
    },
    targetData: {
      trees: 5,
      pollution: 40,
      aqi: 80,
      animals: 3,
    },
  },
  {
    id: 2,
    title: "Save the River",
    description: "Use loops to clean multiple pollution sources",
    difficulty: "Intermediate",
    initialCode: `// Mission: Save the River
// Use loops to clean multiple pollution sources

let pollutionSources = 5;

function saveRiver() {
  // Use a for loop to clean all sources
  
}

saveRiver();`,
    solution: `function saveRiver() {
  for (let i = 0; i < pollutionSources; i++) {
    CleanWater();
    PlantTree();
  }
}`,
    environmentData: {
      trees: 3,
      pollution: 90,
      aqi: 180,
      animals: 0,
    },
    targetData: {
      trees: 8,
      pollution: 20,
      aqi: 50,
      animals: 5,
    },
  },
]

export function EcoCoderGame() {
  const [currentMission, setCurrentMission] = useState(0)
  const [code, setCode] = useState(missions[0].initialCode)
  const [environmentData, setEnvironmentData] = useState(missions[0].environmentData)
  const [isRunning, setIsRunning] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [greenPoints, setGreenPoints] = useState(0)
  const [completedMissions, setCompletedMissions] = useState<number[]>([])

  const mission = missions[currentMission]

  useEffect(() => {
    setCode(mission.initialCode)
    setEnvironmentData(mission.environmentData)
    setFeedback("")
  }, [currentMission, mission])

  const runCode = () => {
    setIsRunning(true)
    setFeedback("Running your eco-code...")

    // Simulate code execution
    setTimeout(() => {
      const newEnvironmentData = { ...environmentData }

      // Simple code analysis to update environment
      if (code.includes("PlantTree()")) {
        const treeCount = (code.match(/PlantTree$$$$/g) || []).length
        newEnvironmentData.trees += treeCount
        newEnvironmentData.pollution = Math.max(0, newEnvironmentData.pollution - treeCount * 10)
        newEnvironmentData.aqi = Math.max(0, newEnvironmentData.aqi - treeCount * 15)
      }

      if (code.includes("RemoveLitter()")) {
        newEnvironmentData.pollution = Math.max(0, newEnvironmentData.pollution - 20)
      }

      if (code.includes("CleanWater()")) {
        const cleanCount = (code.match(/CleanWater$$$$/g) || []).length
        newEnvironmentData.pollution = Math.max(0, newEnvironmentData.pollution - cleanCount * 15)
        newEnvironmentData.aqi = Math.max(0, newEnvironmentData.aqi - cleanCount * 20)
        newEnvironmentData.animals += cleanCount
      }

      if (code.includes("for") && code.includes("CleanWater()")) {
        // Bonus for using loops correctly
        newEnvironmentData.animals += 2
        newEnvironmentData.trees += 2
      }

      setEnvironmentData(newEnvironmentData)

      // Check if mission is completed
      const target = mission.targetData
      const isCompleted =
        newEnvironmentData.trees >= target.trees &&
        newEnvironmentData.pollution <= target.pollution &&
        newEnvironmentData.aqi <= target.aqi &&
        newEnvironmentData.animals >= target.animals

      if (isCompleted) {
        setFeedback("🎉 Mission Completed! The environment is thriving!")
        setGreenPoints((prev) => prev + 100)
        setCompletedMissions((prev) => [...prev, mission.id])
      } else {
        setFeedback("Good progress! Try adding more eco-friendly actions to reach the target.")
      }

      setIsRunning(false)
    }, 2000)
  }

  const resetMission = () => {
    setCode(mission.initialCode)
    setEnvironmentData(mission.environmentData)
    setFeedback("")
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingParticles count={25} />

      {/* Header */}
      <header className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-3xl animate-float">
              🌍
            </div>
            <div>
              <h1 className="text-3xl font-bold holographic">Eco-Coder</h1>
              <p className="text-muted-foreground">Save the planet through coding!</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="animate-glow">
              Green Points: {greenPoints}
            </Badge>
            <Button variant="outline" className="glassmorphism bg-transparent">
              Missions: {completedMissions.length}/{missions.length}
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Mission Selection */}
        <GlassmorphismCard>
          <h2 className="text-xl font-bold mb-4">Select Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {missions.map((m, index) => (
              <button
                key={m.id}
                onClick={() => setCurrentMission(index)}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                  currentMission === index ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                } ${completedMissions.includes(m.id) ? "bg-green-500/10 border-green-500" : ""}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{m.title}</h3>
                  {completedMissions.includes(m.id) && <span className="text-green-500">✅</span>}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{m.description}</p>
                <Badge variant="outline" className="text-xs">
                  {m.difficulty}
                </Badge>
              </button>
            ))}
          </div>
        </GlassmorphismCard>

        {/* Game Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <GlassmorphismCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Code Editor</h3>
              <div className="flex space-x-2">
                <Button onClick={runCode} disabled={isRunning} className="bg-green-500 hover:bg-green-600">
                  {isRunning ? "Running..." : "Run Code"}
                </Button>
                <Button variant="outline" onClick={resetMission} className="bg-transparent">
                  Reset
                </Button>
              </div>
            </div>
            <CodeEditor value={code} onChange={setCode} language="javascript" />
            {feedback && (
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-sm">{feedback}</p>
              </div>
            )}
          </GlassmorphismCard>

          {/* Environment Visualizer */}
          <GlassmorphismCard>
            <h3 className="text-lg font-semibold mb-4">Environment Status</h3>
            <EnvironmentVisualizer data={environmentData} target={mission.targetData} />
          </GlassmorphismCard>
        </div>

        {/* Available Functions Reference */}
        <GlassmorphismCard>
          <h3 className="text-lg font-semibold mb-4">Available Eco-Functions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-muted/30 rounded-lg">
              <h4 className="font-medium text-green-500">PlantTree()</h4>
              <p className="text-sm text-muted-foreground">
                Plants a tree, reduces pollution by 10, improves AQI by 15
              </p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <h4 className="font-medium text-blue-500">CleanWater()</h4>
              <p className="text-sm text-muted-foreground">
                Cleans water source, reduces pollution by 15, attracts animals
              </p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <h4 className="font-medium text-yellow-500">RemoveLitter()</h4>
              <p className="text-sm text-muted-foreground">Removes litter, reduces pollution by 20</p>
            </div>
          </div>
        </GlassmorphismCard>
      </div>
    </div>
  )
}
