import { authApi, api } from '../client'
import { API_ENDPOINTS } from '@/config/routes.config'

export const registrationsService = {
  // ✅ Public endpoint (no auth required)
  create: async (data) => {
    const response = await authApi.post(API_ENDPOINTS.REGISTRATIONS, data)
    return response.data
  },

  // ✅ Admin endpoints
  getAll: async (params = {}) => {
    const response = await api.get(`${API_ENDPOINTS.ADMIN}/registrations`, { params })
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`${API_ENDPOINTS.ADMIN}/registrations/${id}`)
    return response.data
  },

  update: async (id, data) => {
    const response = await api.put(`${API_ENDPOINTS.ADMIN}/registrations/${id}`, data)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`${API_ENDPOINTS.ADMIN}/registrations/${id}`)
    return response.data
  },

  updateStatus: async (id, statusData) => {
    const response = await api.patch(
      `${API_ENDPOINTS.ADMIN}/registrations/${id}/status`,
      statusData
    )
    return response.data
  },

  // ✅ Helper methods
  getPending: async () => {
    const response = await api.get(`${API_ENDPOINTS.ADMIN}/registrations`, {
      params: { status: 'pending' }
    })
    return response.data
  },

  approve: async (id) => {
    return registrationsService.updateStatus(id, { status: 'confirmed' })
  },

  reject: async (id, reason = '') => {
    return registrationsService.updateStatus(id, {
      status: 'rejected',
      reason
    })
  },
}