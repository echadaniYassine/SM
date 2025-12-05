import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { RoleGuard } from '@/components/auth/RoleGuard'
import { AuthRedirect } from '@/components/auth/AuthRedirect'

// Layouts
import { Layout as DashboardLayout } from '@/components/layout/Layout'
import AuthLayout from '@/components/layout/AuthLayout'

// Auth Pages
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage'
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage'

// Admin Pages
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage'
import StudentsPage from '@/pages/admin/StudentsPage'
import TeachersPage from '@/pages/admin/TeachersPage'
import GuardiansPage from '@/pages/admin/GuardiansPage'
import ProgramsPage from '@/pages/admin/ProgramsPage'
import SubjectsPage from '@/pages/admin/SubjectsPage'
import TimetablePage from '@/pages/admin/TimetablePage'
import RegistrationsPage from '@/pages/admin/RegistrationsPage'

// Guardian Pages
import GuardianDashboardPage from '@/pages/guardian/GuardianDashboardPage'
import MyStudentsPage from '@/pages/guardian/MyStudentsPage'

// Teacher Pages
import TeacherDashboardPage from '@/pages/teacher/TeacherDashboardPage'
import MySubjectsPage from '@/pages/teacher/MySubjectsPage'
import MyTimetablePage from '@/pages/teacher/MyTimetablePage'

// Student Pages
import StudentDashboardPage from '@/pages/student/StudentDashboardPage'
import StudentTimetablePage from '@/pages/student/MyTimetablePage'
import StudentSubjectsPage from '@/pages/student/MySubjectsPage'

// Public Pages
import HomePage from '@/pages/public/HomePage'
import PublicProgramsPage from '@/pages/public/ProgramsPage'
import PublicRegisterPage from '@/pages/public/RegisterPublicPage'

// Other
import ProfilePage from '@/pages/ProfilePage'
import NotFoundPage from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  // ============================================
  // Public Routes (No Authentication)
  // ============================================
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
    element: <RegisterPage />,
  },

  // ============================================
  // Auth Routes (Redirect if already logged in)
  // ============================================
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: (
          <AuthRedirect>
            <LoginPage />
          </AuthRedirect>
        ),
      },
      {
        path: '/register',
        element: (
          <AuthRedirect>
            <RegisterPage />
          </AuthRedirect>
        ),
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: '/reset-password',
        element: <ResetPasswordPage />,
      },
    ],
  },

  // ============================================
  // Protected Routes (Authentication Required)
  // ============================================
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      // ============================================
      // Admin Routes
      // ============================================
      {
        path: '/admin',
        element: <RoleGuard allowedRoles={['admin']} />,
        children: [
          {
            path: '',
            element: <Navigate to="/admin/dashboard" replace />,
          },
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
        ],
      },

      // ============================================
      // Guardian Routes
      // ============================================
      {
        path: '/guardian',
        element: <RoleGuard allowedRoles={['guardian']} />,
        children: [
          {
            path: '',
            element: <Navigate to="/guardian/dashboard" replace />,
          },
          {
            path: 'dashboard',
            element: <GuardianDashboardPage />,
          },
          {
            path: 'students',
            element: <MyStudentsPage />,
          },
        ],
      },

      // ============================================
      // Teacher Routes
      // ============================================
      {
        path: '/teacher',
        element: <RoleGuard allowedRoles={['teacher']} />,
        children: [
          {
            path: '',
            element: <Navigate to="/teacher/dashboard" replace />,
          },
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
        ],
      },

      // ============================================
      // Student Routes
      // ============================================
      {
        path: '/student',
        element: <RoleGuard allowedRoles={['student']} />,
        children: [
          {
            path: '',
            element: <Navigate to="/student/dashboard" replace />,
          },
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
        ],
      },

      // ============================================
      // Shared Authenticated Routes
      // ============================================
      {
        path: '/profile',
        element: <ProfilePage />,
      },
    ],
  },

  // ============================================
  // 404 Not Found
  // ============================================
  {
    path: '*',
    element: <NotFoundPage />,
  },
])