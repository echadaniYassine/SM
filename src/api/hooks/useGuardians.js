import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { guardiansService } from '../services/guardians.service'
import { QUERY_KEYS } from '@/config/routes.config'
import toast from 'react-hot-toast'

// Admin: Get all guardians
export const useGuardians = (params = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN_GUARDIANS, params],
    queryFn: () => guardiansService.getAll(params),
  })
}

// Admin: Get single guardian
export const useGuardian = (id) => {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN_GUARDIAN(id),
    queryFn: () => guardiansService.getById(id),
    enabled: !!id,
  })
}

// Admin: Create guardian
export const useCreateGuardian = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: guardiansService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_GUARDIANS })
      toast.success('Guardian created')
    },
  })
}

// Admin: Update guardian
export const useUpdateGuardian = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => guardiansService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_GUARDIANS })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_GUARDIAN(variables.id) })
      toast.success('Guardian updated')
    },
  })
}

// Admin: Delete guardian
export const useDeleteGuardian = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: guardiansService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_GUARDIANS })
      toast.success('Guardian deleted')
    },
  })
}

// Guardian: Get my students list
export const useGuardianStudents = () => {
  return useQuery({
    queryKey: QUERY_KEYS.GUARDIAN_STUDENTS,
    queryFn: guardiansService.myStudents,
  })
}

// Guardian: Get specific student details
export const useGuardianStudent = (studentId) => {
  return useQuery({
    queryKey: QUERY_KEYS.GUARDIAN_STUDENT_DETAILS(studentId),
    queryFn: () => guardiansService.showStudent(studentId),
    enabled: !!studentId,
  })
}