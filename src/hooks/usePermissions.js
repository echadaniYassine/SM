// src/hooks/usePermissions.js
import { useAuth } from './useAuth'

export const usePermissions = () => {
  const { isAdmin, isGuardian, isTeacher, isStudent } = useAuth()

  return {
    canCreateStudent: isAdmin,
    canEditStudent: isAdmin,
    canDeleteStudent: isAdmin,
    canViewAllStudents: isAdmin,
    canViewOwnStudents: isGuardian,
    canCreateTeacher: isAdmin,
    canViewTimetable: isAdmin || isTeacher || isStudent,
  }
}