import { useStudentTimetable } from '@/api/hooks/useStudents'
import WeeklyTimetable from '@/components/features/timetable/WeeklyTimetable'

export default function MyTimetablePage() {
  const { data, isLoading } = useStudentTimetable()

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h1>My Timetable</h1>
      <WeeklyTimetable timetables={data?.data?.data || []} />
    </div>
  )
}