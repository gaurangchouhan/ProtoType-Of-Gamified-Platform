"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const skillNodes = [
  { id: 1, name: "Basic Math", unlocked: true, completed: true, x: 50, y: 80, connections: [2] },
  { id: 2, name: "Algebra", unlocked: true, completed: true, x: 50, y: 60, connections: [3, 4] },
  { id: 3, name: "Geometry", unlocked: true, completed: false, x: 30, y: 40, connections: [5] },
  { id: 4, name: "Statistics", unlocked: true, completed: false, x: 70, y: 40, connections: [5] },
  { id: 5, name: "Calculus", unlocked: false, completed: false, x: 50, y: 20, connections: [] },
]

export function SkillTree() {
  const [selectedNode, setSelectedNode] = useState<number | null>(null)

  return (
    <div className="relative h-64 bg-gradient-to-b from-primary/10 to-accent/10 rounded-lg overflow-hidden">
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        {skillNodes.map((node) =>
          node.connections.map((connectionId) => {
            const connectedNode = skillNodes.find((n) => n.id === connectionId)
            if (!connectedNode) return null
            return (
              <line
                key={`${node.id}-${connectionId}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${connectedNode.x}%`}
                y2={`${connectedNode.y}%`}
                stroke={node.completed ? "#22c55e" : "#6b7280"}
                strokeWidth="2"
                strokeDasharray={node.completed ? "0" : "5,5"}
              />
            )
          }),
        )}
      </svg>

      {/* Skill nodes */}
      {skillNodes.map((node) => (
        <button
          key={node.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs font-medium transition-all duration-200 ${
            node.completed
              ? "bg-accent border-accent text-white animate-glow"
              : node.unlocked
                ? "bg-primary border-primary text-white hover:scale-110"
                : "bg-muted border-muted-foreground text-muted-foreground cursor-not-allowed"
          }`}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          onClick={() => node.unlocked && setSelectedNode(node.id)}
          disabled={!node.unlocked}
        >
          {node.completed ? "✓" : node.unlocked ? "○" : "🔒"}
        </button>
      ))}

      {/* Node details */}
      {selectedNode && (
        <div className="absolute bottom-2 left-2 right-2 bg-card/90 backdrop-blur-sm rounded-lg p-3">
          {(() => {
            const node = skillNodes.find((n) => n.id === selectedNode)
            return (
              node && (
                <div>
                  <h4 className="font-semibold">{node.name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant={node.completed ? "default" : "secondary"}>
                      {node.completed ? "Completed" : "In Progress"}
                    </Badge>
                    {!node.completed && node.unlocked && (
                      <Button size="sm" variant="outline">
                        Start Learning
                      </Button>
                    )}
                  </div>
                </div>
              )
            )
          })()}
        </div>
      )}
    </div>
  )
}
