export const usePrograms = (params = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN_PROGRAMS, params],
    queryFn: () => programsService.getAll(params),
  })
}

export const useProgram = (id) => {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN_PROGRAM(id),
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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_PROGRAMS })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_PROGRAM(variables.id) })
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