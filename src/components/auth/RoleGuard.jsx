import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/authSlice'

export const RoleGuard = ({ allowedRoles }) => {
  const user = useAuthStore((state) => state.user)

  if (!user || !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    const roleRoutes = {
      admin: '/admin/dashboard',
      guardian: '/guardian/dashboard',
      teacher: '/teacher/dashboard',
      student: '/student/dashboard',
    }
    
    return <Navigate to={roleRoutes[user?.role] || '/'} replace />
  }

  return <Outlet />
}