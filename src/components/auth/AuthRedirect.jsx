// src/components/auth/AuthRedirect.jsx
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authSlice'

export const AuthRedirect = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)

  if (isAuthenticated) {
    const roleRoutes = {
      admin: '/admin/dashboard',
      guardian: '/guardian/dashboard',
      teacher: '/teacher/dashboard',
      student: '/student/dashboard',
    }
    return <Navigate to={roleRoutes[user?.role] || '/dashboard'} replace />
  }

  return children
}