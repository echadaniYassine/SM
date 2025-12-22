// src/components/features/subjects/SubjectList.jsx
import { useSubjects } from '@/api/hooks/useSubjects'
import SubjectCard from './SubjectCard'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'

export default function SubjectList({ onSubjectClick }) {
  const { data, isLoading, error } = useSubjects()

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
        <AlertDescription>Error loading subjects: {error.message}</AlertDescription>
      </Alert>
    )
  }

  const subjects = data?.data || data || []

  if (subjects.length === 0) {
    return (
      <Alert>
        <AlertDescription>No subjects found. Click "Add Subject" to create one.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {subjects.map((subject) => (
        <SubjectCard
          key={subject.id}
          subject={subject}
          onClick={() => onSubjectClick?.(subject)}
        />
      ))}
    </div>
  )
}