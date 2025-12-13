import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { QUERY_KEYS } from '@/config/routes.config'
import StudentDashboard from '@/components/features/dashboard/StudentDashboard'

export default function StudentDashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.STUDENT_DASHBOARD || ['student', 'dashboard'],
    queryFn: async () => {
      const response = await api.get('/student/dashboard')
      return response.data
    },
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold">Error loading dashboard</p>
          <p className="mt-2">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <StudentDashboard
      student={data?.data?.profile}
      todaySchedule={data?.data?.today_schedule || []}
    />
  )
}