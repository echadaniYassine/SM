import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { timetableService } from '../services/timetable.service'
import { QUERY_KEYS } from '@/config/routes.config'
import toast from 'react-hot-toast'

export const useTimetables = (params = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN_TIMETABLES(params.program_id), params],
    queryFn: () => timetableService.getAll(params),
  })
}

export const useTimetable = (id) => {
  return useQuery({
    queryKey: ['timetable', id],
    queryFn: () => timetableService.getById(id),
    enabled: !!id,
  })
}

export const useCreateTimetable = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: timetableService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timetables'] })
      toast.success('Timetable created')
    },
  })
}

export const useUpdateTimetable = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => timetableService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timetables'] })
      toast.success('Timetable updated')
    },
  })
}

export const useDeleteTimetable = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: timetableService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timetables'] })
      toast.success('Timetable deleted')
    },
  })
}