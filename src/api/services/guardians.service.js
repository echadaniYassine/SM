// src/api/services/guardians.service.js
import { api } from '../client'
import { API_ENDPOINTS } from '@/config/routes.config'

export const guardiansService = {
  // ✅ Admin endpoints
  getAll: async (params = {}) => {
    const response = await api.get(`${API_ENDPOINTS.ADMIN}/guardians`, { params })
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`${API_ENDPOINTS.ADMIN}/guardians/${id}`)
    return response.data
  },

  create: async (data) => {
    const response = await api.post(`${API_ENDPOINTS.ADMIN}/guardians`, data)
    return response.data
  },

  update: async (id, data) => {
    const response = await api.put(`${API_ENDPOINTS.ADMIN}/guardians/${id}`, data)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`${API_ENDPOINTS.ADMIN}/guardians/${id}`)
    return response.data
  },

  // ✅ Guardian-specific endpoints
  myStudents: async () => {
    const response = await api.get('/guardian/students')
    return response.data
  },

  showStudent: async (studentId) => {
    const response = await api.get(`/guardian/students/${studentId}`)
    return response.data
  },
}