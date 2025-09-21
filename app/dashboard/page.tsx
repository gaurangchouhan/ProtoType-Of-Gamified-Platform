import { StudentDashboard } from "@/components/student-dashboard"
import { AuthGuard } from "@/components/ui/auth-guard"

export default function DashboardPage() {
  return (
    <AuthGuard>
      <StudentDashboard />
    </AuthGuard>
  )
}
