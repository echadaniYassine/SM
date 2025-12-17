// src/api/hooks/useAuth.js
import { useAuthStore } from '@/store/authSlice'
import { authService } from '@/api/services/auth.service'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export const useAuth = () => {
  const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore()
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)

  const login = async (credentials) => {
    setLoading(true)
    try {
      const data = await authService.login(credentials)
      setAuth(data.data.user, data.data.token)
      return data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (payload) => {
    setLoading(true)
    try {
      const data = await authService.register(payload)
      
      // Handle both response formats
      const user = data.data?.guardian || data.data?.user
      const token = data.data?.token
      
      if (user && token) {
        setAuth(user, token)
      }
      
      return data
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      clearAuth()
      queryClient.clear()
    }
  }

  return { user, isAuthenticated, login, register, logout, loading }
}