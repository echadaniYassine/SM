import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/config/routes.config'
import toast from 'react-hot-toast'
import { subjectsService } from '../services/subjects.service'
export const useSubjects = (params = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN_SUBJECTS, params],
    queryFn: () => subjectsService.getAll(params),
  })
}

export const useSubject = (id) => {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN_SUBJECT(id),
    queryFn: () => subjectsService.getById(id),
    enabled: !!id,
  })
}

export const useCreateSubject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: subjectsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_SUBJECTS })
      toast.success('Subject created')
    },
  })
}

export const useUpdateSubject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => subjectsService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_SUBJECTS })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_SUBJECT(variables.id) })
      toast.success('Subject updated')
    },
  })
}

export const useDeleteSubject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: subjectsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_SUBJECTS })
      toast.success('Subject deleted')
    },
  })
}