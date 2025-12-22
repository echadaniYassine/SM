// src/components/features/teachers/TeacherList.jsx
import { useTeachers } from '@/api/hooks/useTeachers'
import TeacherCard from './TeacherCard'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'

export default function TeacherList({ onTeacherClick }) {
  const { data, isLoading, error } = useTeachers()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Error loading teachers: {error.message}</AlertDescription>
      </Alert>
    )
  }

  const teachers = data?.data || data || []

  if (teachers.length === 0) {
    return (
      <Alert>
        <AlertDescription>No teachers found. Click "Add Teacher" to create one.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {teachers.map((teacher) => (
        <TeacherCard
          key={teacher.id}
          teacher={teacher}
          onClick={() => onTeacherClick?.(teacher)}
        />
      ))}
    </div>
  )
}