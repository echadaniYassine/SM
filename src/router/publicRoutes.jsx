import HomePage from '@/pages/public/HomePage'
import PublicProgramsPage from '@/pages/public/ProgramsPage'
import PublicRegisterPage from '@/pages/public/RegisterPublicPage'

export const publicRoutes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/programs',
    element: <PublicProgramsPage />,
  },
  {
    path: '/register-public',
    element: <PublicRegisterPage />,
  },
]