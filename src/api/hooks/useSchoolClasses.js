import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { schoolClassService } from "@/api/services/schoolClass.service"
import { QUERY_KEYS } from "@/config/routes.config"
import toast from "react-hot-toast"

// =======================
// QUERY
// =======================
export const useSchoolClasses = (filters = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.ADMIN_CLASSES, filters],
    queryFn: () => schoolClassService.getAll(filters),
  })
}

// =======================
// CREATE
// =======================
export const useCreateSchoolClass = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: schoolClassService.create,
    onSuccess: () => {
      toast.success("Class created successfully")
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_CLASSES })
    },
  })
}

// =======================
// UPDATE
// =======================
export const useUpdateSchoolClass = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) =>
      schoolClassService.update(id, data),
    onSuccess: (_, variables) => {
      toast.success("Class updated successfully")
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_CLASSES })
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ADMIN_CLASS(variables.id),
      })
    },
  })
}

// =======================
// DELETE
// =======================
export const useDeleteSchoolClass = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: schoolClassService.delete,
    onSuccess: () => {
      toast.success("Class deleted successfully")
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_CLASSES })
    },
  })
}
