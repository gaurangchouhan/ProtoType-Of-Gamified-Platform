import { AuthGuard } from "@/components/ui/auth-guard"
import { TeacherDashboard } from "@/components/teacher-dashboard"

export default function TeacherPage() {
  return (
    <AuthGuard>
      <TeacherDashboard />
    </AuthGuard>
  )
}
