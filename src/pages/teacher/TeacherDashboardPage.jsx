import { useMySubjects, useMyTimetable } from '@/api/hooks/useTeachers'
import TeacherDashboard from '@/components/features/dashboard/TeacherDashboard'

export default function TeacherDashboardPage() {
  const { data: subjectsData } = useMySubjects()
  const { data: timetableData } = useMyTimetable()

  return (
    <TeacherDashboard
      subjects={subjectsData?.data?.data || []}
      todaySchedule={timetableData?.data?.data || []}
    />
  )
}