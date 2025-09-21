import { RecipeCoderGame } from "@/components/games/recipe-coder-game"
import { AuthGuard } from "@/components/ui/auth-guard"

export default function RecipeCoderPage() {
  return (
    <AuthGuard>
      <RecipeCoderGame />
    </AuthGuard>
  )
}
