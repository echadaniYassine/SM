import { useStudentTimetable } from '@/api/hooks/useStudents'
import WeeklyTimetable from '@/components/features/timetable/WeeklyTimetable'
import Loading from '@/components/ui/Loading'
import { ErrorDisplay } from '@/components/ui/Loading'

export default function MyTimetablePage() {
  const { data, isLoading, error, refetch } = useStudentTimetable()

  if (isLoading) return <Loading message="Loading timetable..." />
  if (error) return <ErrorDisplay message={error.message} onRetry={refetch} />

  const timetables = data?.data || data || []

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Timetable</h1>
      <WeeklyTimetable timetables={timetables} />
    </div>
  )
}