import { useAuthStore } from '@/store/authSlice'
import StudentDashboard from '@/components/features/dashboard/StudentDashboard'

export default function StudentDashboardPage() {
  const user = useAuthStore((state) => state.user)

  return <StudentDashboard student={user?.profile} todaySchedule={[]} />
}