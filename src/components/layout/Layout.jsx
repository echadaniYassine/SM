// src/components/layout/Layout.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/api/hooks'
import { useNavigate } from 'react-router-dom'
import {
  Home,
  Users,
  GraduationCap,
  ClipboardList,
  BookOpen,
  Calendar,
  UserCircle
} from 'lucide-react'

import { Sidebar } from './Sidebar'
import { Header } from './Header'

export function Layout({ children }) {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  // Define navigation based on user role with correct paths
  const getNavigation = () => {
    const role = user?.role

    switch (role) {
      case 'admin':
        return [
          { name: t('nav.dashboard'), href: '/admin/dashboard', icon: Home },
          { name: t('nav.students'), href: '/admin/students', icon: Users },
          { name: t('nav.teachers'), href: '/admin/teachers', icon: UserCircle },
          { name: t('nav.guardians'), href: '/admin/guardians', icon: Users },
          { name: t('nav.programs'), href: '/admin/programs', icon: GraduationCap },
          { name: t('nav.subjects'), href: '/admin/subjects', icon: BookOpen },
          { name: t('nav.timetables'), href: '/admin/timetables', icon: Calendar },
          { name: t('nav.registrations'), href: '/admin/registrations', icon: ClipboardList },
        ]

      case 'guardian':
        return [
          { name: t('nav.dashboard'), href: '/guardian/dashboard', icon: Home },
          { name: t('nav.myStudents'), href: '/guardian/students', icon: Users },
        ]

      case 'teacher':
        return [
          { name: t('nav.dashboard'), href: '/teacher/dashboard', icon: Home },
          { name: t('nav.subjects'), href: '/teacher/subjects', icon: BookOpen },
          { name: t('nav.timetable'), href: '/teacher/timetable', icon: Calendar },
        ]

      case 'student':
        return [
          { name: t('nav.dashboard'), href: '/student/dashboard', icon: Home },
          { name: t('nav.timetable'), href: '/student/timetable', icon: Calendar },
          { name: t('nav.subjects'), href: '/student/subjects', icon: BookOpen },
        ]

      default:
        return []
    }
  }

  const filteredNavigation = getNavigation()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        filteredNavigation={filteredNavigation}
        user={user}
        handleLogout={handleLogout}
      />

      <div className="lg:pl-64">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Use Outlet for nested routes */}
            <Outlet />
            {/* Fallback to children if provided directly */}
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}