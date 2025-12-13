export const useRegistrations = (params = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN_REGISTRATIONS, params],
    queryFn: () => registrationsService.getAll(params),
  })
}

export const useRegistration = (id) => {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN_REGISTRATION(id),
    queryFn: () => registrationsService.getById(id),
    enabled: !!id,
  })
}

export const useCreateRegistration = () => {
  return useMutation({
    mutationFn: registrationsService.create,
    onSuccess: () => {
      toast.success('Registration submitted')
    },
  })
}

export const useUpdateRegistrationStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, statusData }) => registrationsService.updateStatus(id, statusData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_REGISTRATIONS })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_REGISTRATION(variables.id) })
      toast.success('Status updated')
    },
  })
}

export const useDeleteRegistration = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: registrationsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_REGISTRATIONS })
      toast.success('Registration deleted')
    },
  })
}