import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { guardiansService } from '../services/guardians.service'
import { QUERY_KEYS } from '@/config/routes.config'
import toast from 'react-hot-toast'

export const useGuardians = (params = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN_GUARDIANS, params],
    queryFn: () => guardiansService.getAll(params),
  })
}

export const useGuardian = (id) => {
  return useQuery({
    queryKey: ['guardian', id],
    queryFn: () => guardiansService.getById(id),
    enabled: !!id,
  })
}

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

export const useUpdateGuardian = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => guardiansService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_GUARDIANS })
      toast.success('Guardian updated')
    },
  })
}

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

export const useMyStudents = () => {
  return useQuery({
    queryKey: ['my-students'],
    queryFn: guardiansService.myStudents,
  })
}