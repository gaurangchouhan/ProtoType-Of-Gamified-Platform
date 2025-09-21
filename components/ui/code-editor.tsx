"use client"

import type React from "react"

import { useState } from "react"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
}

export function CodeEditor({ value, onChange, language }: CodeEditorProps) {
  const [lineNumbers, setLineNumbers] = useState(value.split("\n").length)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    onChange(newValue)
    setLineNumbers(newValue.split("\n").length)
  }

  return (
    <div className="relative border border-border rounded-lg overflow-hidden bg-muted/20">
      <div className="flex items-center justify-between p-2 bg-muted/50 border-b border-border">
        <span className="text-sm font-medium">{language}</span>
        <span className="text-xs text-muted-foreground">{lineNumbers} lines</span>
      </div>
      <div className="flex">
        <div className="bg-muted/30 p-2 text-xs text-muted-foreground font-mono min-w-[3rem] text-right">
          {Array.from({ length: lineNumbers }, (_, i) => (
            <div key={i + 1}>{i + 1}</div>
          ))}
        </div>
        <textarea
          value={value}
          onChange={handleChange}
          className="flex-1 p-2 bg-transparent border-none outline-none resize-none font-mono text-sm min-h-[300px]"
          spellCheck={false}
        />
      </div>
    </div>
  )
}
