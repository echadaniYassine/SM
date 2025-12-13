// src/api/services/timetable.service.js
import { api } from '../client'

export const timetableService = {
  // ✅ Admin endpoints
  getAll: async (params = {}) => {
    const response = await api.get('/admin/timetables', { params })
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/admin/timetables/${id}`)
    return response.data
  },

  create: async (data) => {
    const response = await api.post('/admin/timetables', data)
    return response.data
  },

  update: async (id, data) => {
    const response = await api.put(`/admin/timetables/${id}`, data)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/admin/timetables/${id}`)
    return response.data
  },

  // ✅ Filter by program
  getByProgram: async (programId) => {
    const response = await api.get('/admin/timetables', {
      params: { program_id: programId }
    })
    return response.data
  },

  // ✅ Filter by day
  getByDay: async (programId, dayOfWeek) => {
    const response = await api.get('/admin/timetables', {
      params: { program_id: programId, day_of_week: dayOfWeek }
    })
    return response.data
  },
}