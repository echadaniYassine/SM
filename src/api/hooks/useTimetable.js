export const useTimetables = (params = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN_TIMETABLES(params.program_id), params],
    queryFn: () => timetableService.getAll(params),
  })
}

export const useTimetable = (id) => {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN_TIMETABLE(id),
    queryFn: () => timetableService.getById(id),
    enabled: !!id,
  })
}

export const useCreateTimetable = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: timetableService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_TIMETABLES() })
      toast.success('Timetable created')
    },
  })
}

export const useUpdateTimetable = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => timetableService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_TIMETABLES() })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_TIMETABLE(variables.id) })
      toast.success('Timetable updated')
    },
  })
}

export const useDeleteTimetable = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: timetableService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_TIMETABLES() })
      toast.success('Timetable deleted')
    },
  })
}