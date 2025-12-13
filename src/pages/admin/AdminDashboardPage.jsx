import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { QUERY_KEYS, API_ENDPOINTS } from '@/config/routes.config'
import AdminDashboard from '@/components/features/dashboard/AdminDashboard'

export default function AdminDashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.ADMIN_DASHBOARD,
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.ADMIN_DASHBOARD)
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

  return <AdminDashboard stats={data?.data} />
}
