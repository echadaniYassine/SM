import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { QUERY_KEYS, API_ENDPOINTS } from '@/config/routes.config'
import AdminDashboard from '@/components/features/dashboard/AdminDashboard'
import Loading from '@/components/ui/Loading'
import { ErrorDisplay } from '@/components/ui/Loading'

export default function AdminDashboardPage() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: QUERY_KEYS.ADMIN_DASHBOARD,
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.ADMIN_DASHBOARD)
      return response.data
    },
  })

  if (isLoading) return <Loading message="Loading dashboard..." />

  if (error) {
    return (
      <ErrorDisplay
        title="Error loading dashboard"
        message={error.message}
        onRetry={refetch}
      />
    )
  }

  return <AdminDashboard stats={data?.data} />
}