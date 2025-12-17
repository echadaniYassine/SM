// src/api/services/students.service.js
import { api } from '../client'
import { API_ENDPOINTS } from '@/config/routes.config'

export const studentsService = {
  // ✅ Admin endpoints
  getAll: async (params = {}) => {
    const response = await api.get(`${API_ENDPOINTS.ADMIN}/students`, { params })
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`${API_ENDPOINTS.ADMIN}/students/${id}`)
    return response.data
  },

  create: async (data) => {
    const response = await api.post(`${API_ENDPOINTS.ADMIN}/students`, data)
    return response.data
  },

  update: async (id, data) => {
    const response = await api.put(`${API_ENDPOINTS.ADMIN}/students/${id}`, data)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`${API_ENDPOINTS.ADMIN}/students/${id}`)
    return response.data
  },

  // ✅ Student-specific endpoints - Use API_ENDPOINTS
  myDashboard: async () => {
    const response = await api.get(API_ENDPOINTS.STUDENT.DASHBOARD)
    return response.data
  },

  myTimetable: async () => {
    const response = await api.get(API_ENDPOINTS.STUDENT.TIMETABLE)
    return response.data
  },

  mySubjects: async () => {
    const response = await api.get(API_ENDPOINTS.STUDENT.SUBJECTS)
    return response.data
  },
}