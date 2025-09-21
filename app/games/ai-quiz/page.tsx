import { AIQuizGame } from "@/components/games/ai-quiz-game"
import { AuthGuard } from "@/components/ui/auth-guard"

export default function AIQuizPage() {
  return (
    <AuthGuard>
      <AIQuizGame />
    </AuthGuard>
  )
}
