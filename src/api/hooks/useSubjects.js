import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { subjectsService } from '../services/subjects.service'
import toast from 'react-hot-toast'

export const useSubjects = (params = {}) => {
  return useQuery({
    queryKey: ['subjects', params],
    queryFn: () => subjectsService.getAll(params),
  })
}

export const useSubject = (id) => {
  return useQuery({
    queryKey: ['subject', id],
    queryFn: () => subjectsService.getById(id),
    enabled: !!id,
  })
}

export const useCreateSubject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: subjectsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] })
      toast.success('Subject created')
    },
  })
}

export const useUpdateSubject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => subjectsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] })
      toast.success('Subject updated')
    },
  })
}

export const useDeleteSubject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: subjectsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] })
      toast.success('Subject deleted')
    },
  })
}