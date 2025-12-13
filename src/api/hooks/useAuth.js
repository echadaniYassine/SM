// src/api/hooks/useAuth.js
import { useAuthStore } from '@/store/authSlice'
import { authService } from '@/api/services/auth.service'
import { useQueryClient } from '@tanstack/react-query'

export const useAuth = () => {
  const { user, isAuthenticated, setUser, setToken, clearUser } = useAuthStore()
  const queryClient = useQueryClient()

  const login = async (credentials) => {
    const data = await authService.login(credentials)
    setUser(data.data.user)
    setToken(data.data.token)
    return data
  }

  const register = async (payload) => {
    const data = await authService.register(payload)
    setUser(data.data.user || data.data.guardian)
    setToken(data.data.token)
    return data
  }

  const logout = async () => {
    try {
      await authService.logout()
    } finally {
      clearUser()
      queryClient.clear()
    }
  }

  return { user, isAuthenticated, login, register, logout }
}
