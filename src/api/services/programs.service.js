import { authApi, api } from '../client'
import { API_ENDPOINTS } from '@/config/routes.config'

export const programsService = {
  // ✅ Public endpoint (no auth required)
  getAll: async (params = {}) => {
    const response = await authApi.get(API_ENDPOINTS.PROGRAMS, { params })
    return response.data
  },

  // ✅ Admin endpoints
  getById: async (id) => {
    const response = await api.get(`${API_ENDPOINTS.ADMIN}/programs/${id}`)
    return response.data
  },

  create: async (data) => {
    const response = await api.post(`${API_ENDPOINTS.ADMIN}/programs`, data)
    return response.data
  },

  update: async (id, data) => {
    const response = await api.put(`${API_ENDPOINTS.ADMIN}/programs/${id}`, data)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`${API_ENDPOINTS.ADMIN}/programs/${id}`)
    return response.data
  },

  getActive: async () => {
    const response = await authApi.get(API_ENDPOINTS.PROGRAMS)
    return response.data
  },
}