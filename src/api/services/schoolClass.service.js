// src/api/services/schoolClass.service.js
import { api } from '../client'
import { API_ENDPOINTS } from '@/config/routes.config'

const ADMIN_CLASSES = `${API_ENDPOINTS.ADMIN}/classes`

export const schoolClassService = {
 
  getAll: async (params = {}) => {
    const { data } = await api.get(ADMIN_CLASSES, { params })
    return data
  },

  getById: async (id) => {
    const { data } = await api.get(`${ADMIN_CLASSES}/${id}`)
    return data
  },

  create: async (payload) => {
    const { data } = await api.post(ADMIN_CLASSES, payload)
    return data
  },

  update: async (id, payload) => {
    const { data } = await api.put(`${ADMIN_CLASSES}/${id}`, payload)
    return data
  },

  delete: async (id) => {
    const { data } = await api.delete(`${ADMIN_CLASSES}/${id}`)
    return data
  },

  availableForEnrollment: async (academicYear) => {
    const { data } = await api.get(
      `${ADMIN_CLASSES}/available/enrollment`,
      { params: { academic_year: academicYear } }
    )
    return data
  },

  assignSubject: async (classId, payload) => {
    const { data } = await api.post(
      `${ADMIN_CLASSES}/${classId}/assign-subject`,
      payload
    )
    return data
  },

  removeSubject: async (classId, subjectId) => {
    const { data } = await api.post(
      `${ADMIN_CLASSES}/${classId}/remove-subject`,
      { subject_id: subjectId }
    )
    return data
  },
}
