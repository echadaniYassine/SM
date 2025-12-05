import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { teachersService } from '../services/teachers.service'
import { QUERY_KEYS } from '@/config/routes.config'
import toast from 'react-hot-toast'

export const useTeachers = (params = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN_TEACHERS, params],
    queryFn: () => teachersService.getAll(params),
  })
}

export const useTeacher = (id) => {
  return useQuery({
    queryKey: ['teacher', id],
    queryFn: () => teachersService.getById(id),
    enabled: !!id,
  })
}

export const useCreateTeacher = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: teachersService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_TEACHERS })
      toast.success('Teacher created')
    },
  })
}

export const useUpdateTeacher = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => teachersService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_TEACHERS })
      toast.success('Teacher updated')
    },
  })
}

export const useDeleteTeacher = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: teachersService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_TEACHERS })
      toast.success('Teacher deleted')
    },
  })
}

export const useMySubjects = () => {
  return useQuery({
    queryKey: ['my-subjects'],
    queryFn: teachersService.mySubjects,
  })
}

export const useMyTimetable = () => {
  return useQuery({
    queryKey: ['my-timetable'],
    queryFn: teachersService.myTimetable,
  })
}