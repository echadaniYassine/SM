// src/api/client.js
import axios from 'axios'
import { handleApiError } from './errors'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// Auth instance (no token required)
export const authApi = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000,
})

authApi.interceptors.response.use((r) => r, handleApiError)

// Protected API instance
export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000,
})

// Attach token to protected requests
api.interceptors.request.use(
  (config) => {
    const storage = localStorage.getItem('auth-storage')

    if (storage) {
      try {
        const parsed = JSON.parse(storage)
        const token = parsed?.state?.token

        if (token) {
          config.headers.Authorization = `Bearer ${token}`
          console.log('🔑 Token attached to request')
        } else {
          console.warn('⚠️ No token found in auth storage')
        }
      } catch (error) {
        console.error('❌ Error parsing auth storage:', error)
      }
    } else {
      console.warn('⚠️ No auth storage found')
    }

    return config
  },
  (error) => {
    console.error('❌ Request interceptor error:', error)
    return Promise.reject(error)
  }
)

// Enhanced response interceptor with better error logging
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Enhanced error logging
    if (error.config?.url?.includes('/student/')) {
      console.error('❌ API Error:', {
        url: error.config?.url,
        status: error.response?.status,
        statusText: error.response?.statusText,
        message: error.response?.data?.message || error.message,
        data: error.response?.data
      })
    }
    
    return handleApiError(error)
  }
)