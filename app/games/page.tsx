import { GamesSection } from "@/components/games-section"
import { AuthGuard } from "@/components/ui/auth-guard"

export default function GamesPage() {
  return (
    <AuthGuard>
      <GamesSection />
    </AuthGuard>
  )
}
