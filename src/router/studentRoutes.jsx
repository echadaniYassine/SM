import StudentDashboardPage from '@/pages/student/StudentDashboardPage'
import StudentTimetablePage from '@/pages/student/MyTimetablePage'
import StudentSubjectsPage from '@/pages/student/MySubjectsPage'

export const studentRoutes = [
  {
    path: 'dashboard',
    element: <StudentDashboardPage />,
  },
  {
    path: 'timetable',
    element: <StudentTimetablePage />,
  },
  {
    path: 'subjects',
    element: <StudentSubjectsPage />,
  },
]