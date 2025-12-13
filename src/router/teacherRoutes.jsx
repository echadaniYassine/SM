// router/teacherRoutes.jsx
import TeacherDashboardPage from '@/pages/teacher/TeacherDashboardPage'
import MySubjectsPage from '@/pages/teacher/MySubjectsPage'
import MyTimetablePage from '@/pages/teacher/MyTimetablePage'

export const teacherRoutes = [
  {
    path: 'dashboard',
    element: <TeacherDashboardPage />,
  },
  {
    path: 'subjects',
    element: <MySubjectsPage />,
  },
  {
    path: 'timetable',
    element: <MyTimetablePage />,
  },
]