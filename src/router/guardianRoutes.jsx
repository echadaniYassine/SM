import GuardianDashboardPage from '@/pages/guardian/GuardianDashboardPage'
import MyStudentsPage from '@/pages/guardian/MyStudentsPage'

export const guardianRoutes = [
  {
    path: 'dashboard',
    element: <GuardianDashboardPage />,
  },
  {
    path: 'students',
    element: <MyStudentsPage />,
  },
]