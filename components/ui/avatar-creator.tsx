"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const avatarOptions = {
  backgrounds: ["🏡", "🌾", "🏫", "🌳", "🏞️"],
  characters: ["👦", "👧", "🧑", "👨", "👩"],
  accessories: ["🎓", "📚", "🌟", "🎯", "🏆"],
}

export function AvatarCreator() {
  const [selectedBackground, setSelectedBackground] = useState(avatarOptions.backgrounds[0])
  const [selectedCharacter, setSelectedCharacter] = useState(avatarOptions.characters[0])
  const [selectedAccessory, setSelectedAccessory] = useState(avatarOptions.accessories[0])

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Create Your Avatar</h3>
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl relative">
          <span className="absolute inset-0 flex items-center justify-center">{selectedBackground}</span>
          <span className="relative z-10">{selectedCharacter}</span>
          <span className="absolute top-0 right-0 text-lg">{selectedAccessory}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-2">Background</label>
          <div className="flex justify-center space-x-2">
            {avatarOptions.backgrounds.map((bg, index) => (
              <Button
                key={index}
                variant={selectedBackground === bg ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedBackground(bg)}
                className="text-lg"
              >
                {bg}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Character</label>
          <div className="flex justify-center space-x-2">
            {avatarOptions.characters.map((char, index) => (
              <Button
                key={index}
                variant={selectedCharacter === char ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCharacter(char)}
                className="text-lg"
              >
                {char}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Accessory</label>
          <div className="flex justify-center space-x-2">
            {avatarOptions.accessories.map((acc, index) => (
              <Button
                key={index}
                variant={selectedAccessory === acc ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedAccessory(acc)}
                className="text-lg"
              >
                {acc}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
