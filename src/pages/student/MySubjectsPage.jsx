import { useStudentSubjects } from '@/api/hooks/useStudents'
import Loading from '@/components/ui/Loading'
import { ErrorDisplay } from '@/components/ui/Loading'

export default function MySubjectsPage() {
  const { data, isLoading, error, refetch } = useStudentSubjects()

  if (isLoading) return <Loading message="Loading subjects..." />
  if (error) return <ErrorDisplay message={error.message} onRetry={refetch} />

  const subjects = data?.data || data || []

  if (subjects.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">My Subjects</h1>
        <p className="text-muted-foreground">No subjects enrolled yet</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Subjects</h1>
      <div className="grid gap-4">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
          >
            <h3 className="font-semibold text-lg">{subject.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Code: {subject.code}
            </p>
            {subject.teacher?.name && (
              <p className="text-sm text-muted-foreground mt-1">
                Teacher: {subject.teacher.name}
              </p>
            )}
            {subject.description && (
              <p className="text-sm mt-2">{subject.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}