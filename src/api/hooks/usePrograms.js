import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { programsService } from '../services/programs.service'
import { QUERY_KEYS } from '@/config/routes.config'
import toast from 'react-hot-toast'

export const usePrograms = (params = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN_PROGRAMS, params],
    queryFn: () => programsService.getAll(params),
  })
}

export const useProgram = (id) => {
  return useQuery({
    queryKey: ['program', id],
    queryFn: () => programsService.getById(id),
    enabled: !!id,
  })
}

export const useCreateProgram = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: programsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_PROGRAMS })
      toast.success('Program created')
    },
  })
}

export const useUpdateProgram = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => programsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_PROGRAMS })
      toast.success('Program updated')
    },
  })
}

export const useDeleteProgram = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: programsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_PROGRAMS })
      toast.success('Program deleted')
    },
  })
}