import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import AdminDashboard from '@/components/features/dashboard/AdminDashboard'

export default function AdminDashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: async () => {
      const response = await api.get('/admin/dashboard')
      return response.data
    },
  })

  if (isLoading) return <div>Loading...</div>

  return <AdminDashboard stats={data?.data} />
}
