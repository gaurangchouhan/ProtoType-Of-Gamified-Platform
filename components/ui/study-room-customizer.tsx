"use client"

import { Button } from "@/components/ui/button"

const roomOptions = [
  { id: "farmhouse", name: "Farmhouse", emoji: "🏡", description: "Cozy rural setting" },
  { id: "village", name: "Village Square", emoji: "🏘️", description: "Community learning space" },
  { id: "school", name: "Village School", emoji: "🏫", description: "Traditional classroom" },
  { id: "nature", name: "Under the Tree", emoji: "🌳", description: "Outdoor learning" },
  { id: "library", name: "Digital Library", emoji: "📚", description: "Modern study space" },
]

interface StudyRoomCustomizerProps {
  selectedRoom: string
  onRoomChange: (roomId: string) => void
}

export function StudyRoomCustomizer({ selectedRoom, onRoomChange }: StudyRoomCustomizerProps) {
  const currentRoom = roomOptions.find((room) => room.id === selectedRoom) || roomOptions[0]

  return (
    <div className="space-y-4">
      {/* Current room preview */}
      <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
        <div className="text-6xl mb-2">{currentRoom.emoji}</div>
        <h4 className="font-semibold">{currentRoom.name}</h4>
        <p className="text-sm text-muted-foreground">{currentRoom.description}</p>
      </div>

      {/* Room options */}
      <div className="grid grid-cols-3 gap-2">
        {roomOptions.map((room) => (
          <Button
            key={room.id}
            variant={selectedRoom === room.id ? "default" : "outline"}
            size="sm"
            onClick={() => onRoomChange(room.id)}
            className="flex flex-col items-center p-2 h-auto"
          >
            <span className="text-lg mb-1">{room.emoji}</span>
            <span className="text-xs">{room.name}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
