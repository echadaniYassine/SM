// src/store/authSlice.js - Verify this matches your setup
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        console.log('🔐 Setting auth:', { user, hasToken: !!token })
        set({
          user,
          token,
          isAuthenticated: true,
        })
      },

      clearAuth: () => {
        console.log('🚪 Clearing auth')
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },

      updateUser: (userData) => {
        console.log('👤 Updating user:', userData)
        set((state) => ({
          user: { ...state.user, ...userData },
        }))
      },
    }),
    {
      name: 'auth-storage',
      // Ensure the structure is correct
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

// Helper to check auth state (use this in console for debugging)
export const debugAuth = () => {
  const state = useAuthStore.getState()
  console.group('🔍 Auth State Debug')
  console.log('User:', state.user)
  console.log('Role:', state.user?.role)
  console.log('Token:', state.token ? state.token.substring(0, 30) + '...' : 'None')
  console.log('Is Authenticated:', state.isAuthenticated)
  
  const storage = localStorage.getItem('auth-storage')
  if (storage) {
    console.log('LocalStorage:', JSON.parse(storage))
  }
  console.groupEnd()
  
  return state
}

// Call this in browser console: window.debugAuth()
if (typeof window !== 'undefined') {
  window.debugAuth = debugAuth
}