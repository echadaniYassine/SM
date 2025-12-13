// src/hooks/useRole.js
import { useAuthStore } from '@/store/authSlice'

export const useRole = () => {
  const user = useAuthStore((state) => state.user)
  return user?.role
}