import { useStudents } from '@/api/hooks/useStudents'
import StudentCard from './StudentCard'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'

export default function StudentList({ onStudentClick }) {
  const { data, isLoading, error } = useStudents()

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
        <AlertDescription>Error loading students: {error.message}</AlertDescription>
      </Alert>
    )
  }

  const students = data?.data || data || []

  if (students.length === 0) {
    return (
      <Alert>
        <AlertDescription>No students found. Click "Add Student" to create one.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          onClick={() => onStudentClick?.(student)}
        />
      ))}
    </div>
  )
}