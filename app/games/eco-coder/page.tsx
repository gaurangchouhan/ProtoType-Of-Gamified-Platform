import { EcoCoderGame } from "@/components/games/eco-coder-game"
import { AuthGuard } from "@/components/ui/auth-guard"

export default function EcoCoderPage() {
  return (
    <AuthGuard>
      <EcoCoderGame />
    </AuthGuard>
  )
}
