// src/pages/student/StudentDashboardPage.jsx
import { useStudentDashboard } from '@/api/hooks/useStudents'
import StudentDashboard from '@/components/features/dashboard/StudentDashboard'
import Loading from '@/components/ui/Loading'
import { ErrorDisplay } from '@/components/ui/Loading'
import { useAuthStore } from '@/store/authSlice'
import { useEffect } from 'react'

export default function StudentDashboardPage() {
  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)
  const { data, isLoading, error, refetch } = useStudentDashboard()

  if (isLoading) {
    return (
      <Loading message="Loading dashboard..." />
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <ErrorDisplay 
          message={error.message || 'Failed to load dashboard'} 
          onRetry={refetch} 
        />
        
        {/* Additional debug info */}
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">Debug Information:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• User Role: <strong>{user?.role || 'Not set'}</strong></li>
            <li>• User ID: <strong>{user?.id || 'Not set'}</strong></li>
            <li>• Token: <strong>{token ? 'Present ✓' : 'Missing ✗'}</strong></li>
            <li>• Error Status: <strong>{error?.response?.status || 'Unknown'}</strong></li>
            <li>• Error Message: <strong>{error?.response?.data?.message || error.message}</strong></li>
          </ul>
        </div>
      </div>
    )
  }

  // Success - render dashboard
  return (
    <StudentDashboard
      student={data?.data?.profile}
      todaySchedule={data?.data?.today_schedule || []}
    />
  )
}