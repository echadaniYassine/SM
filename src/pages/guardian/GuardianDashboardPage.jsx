import { useMyStudents } from '@/api/hooks/useGuardians'
import GuardianDashboard from '@/components/features/dashboard/GuardianDashboard'

export default function GuardianDashboardPage() {
  const { data, isLoading } = useMyStudents()

  if (isLoading) return <div>Loading...</div>

  return <GuardianDashboard students={data?.data?.data || []} />
}