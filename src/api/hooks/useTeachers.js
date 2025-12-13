export const useTeachers = (params = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN_TEACHERS, params],
    queryFn: () => teachersService.getAll(params),
  })
}

export const useTeacher = (id) => {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN_TEACHER(id),
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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_TEACHERS })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_TEACHER(variables.id) })
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

export const useTeacherSubjects = () => {
  return useQuery({
    queryKey: QUERY_KEYS.TEACHER_SUBJECTS,
    queryFn: teachersService.mySubjects,
  })
}

export const useTeacherTimetable = () => {
  return useQuery({
    queryKey: QUERY_KEYS.TEACHER_TIMETABLE,
    queryFn: teachersService.myTimetable,
  })
}