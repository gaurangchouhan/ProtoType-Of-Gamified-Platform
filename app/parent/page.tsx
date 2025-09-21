import { AuthGuard } from "@/components/ui/auth-guard"
import { ParentDashboard } from "@/components/parent-dashboard"

export default function ParentPage() {
  return (
    <AuthGuard>
      <ParentDashboard />
    </AuthGuard>
  )
}
