// src/api/services/teachers.service.js
import { api } from '../client'
import { API_ENDPOINTS } from '@/config/routes.config'

export const teachersService = {
  // ✅ Admin endpoints
  getAll: async (params = {}) => {
    const response = await api.get(`${API_ENDPOINTS.ADMIN}/teachers`, { params })
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`${API_ENDPOINTS.ADMIN}/teachers/${id}`)
    return response.data
  },

  create: async (data) => {
    const response = await api.post(`${API_ENDPOINTS.ADMIN}/teachers`, data)
    return response.data
  },

  update: async (id, data) => {
    const response = await api.put(`${API_ENDPOINTS.ADMIN}/teachers/${id}`, data)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`${API_ENDPOINTS.ADMIN}/teachers/${id}`)
    return response.data
  },

  mySubjects: async () => {
    const response = await api.get('/teacher/subjects')
    return response.data
  },

  myTimetable: async () => {
    const response = await api.get('/teacher/timetable')
    return response.data
  },
}