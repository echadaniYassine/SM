// router/adminRoutes.jsx
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage'
import StudentsPage from '@/pages/admin/StudentsPage'
import TeachersPage from '@/pages/admin/TeachersPage'
import GuardiansPage from '@/pages/admin/GuardiansPage'
import ProgramsPage from '@/pages/admin/ProgramsPage'
import SubjectsPage from '@/pages/admin/SubjectsPage'
import TimetablePage from '@/pages/admin/TimetablePage'
import RegistrationsPage from '@/pages/admin/RegistrationsPage'
import SchoolClassesPage from '@/pages/admin/SchoolClassesPage'
export const adminRoutes = [
  {
    path: 'dashboard',
    element: <AdminDashboardPage />,
  },
  {
    path: 'students',
    element: <StudentsPage />,
  },
  {
    path: 'teachers',
    element: <TeachersPage />,
  },
  {
    path: 'guardians',
    element: <GuardiansPage />,
  },
  {
    path: 'programs',
    element: <ProgramsPage />,
  },
  {
    path: 'subjects',
    element: <SubjectsPage />,
  },
  {
    path: 'timetables',
    element: <TimetablePage />,
  },
  {
    path: 'registrations',
    element: <RegistrationsPage />,
  },
  {
    path: 'classes',
    element: <SchoolClassesPage />,
  },
]