import { authApi, api } from '../client'
import { API_ENDPOINTS } from '@/config/routes.config'

export const authService = {
  
  login: async (credentials) => {
    const response = await authApi.post(API_ENDPOINTS.AUTH.LOGIN, credentials)
    return response.data
  },

  register: async (registrationData) => {
    const response = await authApi.post(API_ENDPOINTS.AUTH.REGISTER, registrationData)
    return response.data
  },

  forgotPassword: async (email) => {
    const response = await authApi.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email })
    return response.data
  },

  resetPassword: async (data) => {
    const response = await authApi.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data)
    return response.data
  },

  logout: async () => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT)
    return response.data
  },

  getProfile: async () => {
    const response = await api.get(API_ENDPOINTS.AUTH.PROFILE)
    return response.data
  },

  verifyEmail: async (id, hash) => {
    const response = await api.get(`/email/verify/${id}/${hash}`)
    return response.data
  },

  resendVerification: async () => {
    const response = await api.post('/email/resend')
    return response.data
  },
}