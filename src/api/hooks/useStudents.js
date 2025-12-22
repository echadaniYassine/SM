import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { studentsService } from '../services/students.service'
import { QUERY_KEYS } from '@/config/routes.config'
import toast from 'react-hot-toast'

export const useStudents = (params = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN_STUDENTS, params],
    queryFn: () => studentsService.getAll(params),
  })
}

export const useStudent = (id) => {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN_STUDENT(id),
    queryFn: () => studentsService.getById(id),
    enabled: !!id,
  })
}

export const useCreateStudent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: studentsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_STUDENTS })
      toast.success('Student created')
    },
  })
}

export const useUpdateStudent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => studentsService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_STUDENTS })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_STUDENT(id) })
      toast.success('Student updated')
    },
  })
}

export const useDeleteStudent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: studentsService.delete,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_STUDENTS })
      queryClient.removeQueries({ queryKey: QUERY_KEYS.ADMIN_STUDENT(id) })
      toast.success('Student deleted')
    },
  })
}


export const useStudentTimetable = () => {
  return useQuery({
    queryKey: QUERY_KEYS.STUDENT_TIMETABLE,
    queryFn: studentsService.myTimetable,
  })
}

export const useStudentSubjects = () => {
  return useQuery({
    queryKey: QUERY_KEYS.STUDENT_SUBJECTS,
    queryFn: studentsService.mySubjects,
  })
}

export const useStudentDashboard = () => {
  return useQuery({
    queryKey: QUERY_KEYS.STUDENT_DASHBOARD,
    queryFn: studentsService.myDashboard,
  })
}

export const useStudentClass = () => {
  return useQuery({
    queryKey: QUERY_KEYS.STUDENT_CLASS,
    queryFn: studentsService.myClass,
  })
}

export const useStudentClassmates = () => {
  return useQuery({
    queryKey: QUERY_KEYS.STUDENT_CLASSMATES,
    queryFn: studentsService.myClassmates,
  })
}

