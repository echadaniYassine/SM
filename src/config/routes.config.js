// src/config/routes.config.js

// ============================================
// Frontend Route Paths (for React Router)
// ============================================
export const ROUTE_PATHS = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROGRAMS: '/programs',
  REGISTER_PUBLIC: '/register-public',

  // Admin routes
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    STUDENTS: '/admin/students',
    TEACHERS: '/admin/teachers',
    GUARDIANS: '/admin/guardians',
    PROGRAMS: '/admin/programs',
    SUBJECTS: '/admin/subjects',
    TIMETABLES: '/admin/timetables',
    REGISTRATIONS: '/admin/registrations',
  },

  // Guardian routes
  GUARDIAN: {
    DASHBOARD: '/guardian/dashboard',
    STUDENTS: '/guardian/students',
  },

  // Teacher routes
  TEACHER: {
    DASHBOARD: '/teacher/dashboard',
    SUBJECTS: '/teacher/subjects',
    TIMETABLE: '/teacher/timetable',
  },

  // Student routes
  STUDENT: {
    DASHBOARD: '/student/dashboard',
    TIMETABLE: '/student/timetable',
    SUBJECTS: '/student/subjects',
  },

  // Shared routes
  PROFILE: '/profile',
}

// ============================================
// API Endpoints (for backend requests)
// ============================================
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/user',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/email/verify',
    RESEND_VERIFICATION: '/email/resend',
  },

  // Public endpoints
  PROGRAMS: '/programs',
  REGISTRATIONS: '/registrations',

  // Admin base
  ADMIN: '/admin',

  // Admin dashboard
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_STATISTICS: '/admin/statistics',

  // Guardian endpoints
  GUARDIAN: {
    DASHBOARD: '/guardian/dashboard',
    STUDENTS: '/guardian/students',
    STUDENT_DETAILS: (id) => `/guardian/students/${id}`,
  },

  // Teacher endpoints
  TEACHER: {
    DASHBOARD: '/teacher/dashboard',
    SUBJECTS: '/teacher/subjects',
    TIMETABLE: '/teacher/timetable',
  },

  // Student endpoints
  STUDENT: {
    DASHBOARD: '/student/dashboard',
    SUBJECTS: '/student/subjects',
    TIMETABLE: '/student/timetable',
  },
}

// ============================================
// React Query Cache Keys
// ============================================
export const QUERY_KEYS = {
  // Admin queries
  ADMIN_DASHBOARD: ['admin', 'dashboard'],
  ADMIN_STATISTICS: ['admin', 'statistics'],
  ADMIN_STUDENTS: ['admin', 'students'],
  ADMIN_TEACHERS: ['admin', 'teachers'],
  ADMIN_GUARDIANS: ['admin', 'guardians'],
  ADMIN_PROGRAMS: ['admin', 'programs'],
  ADMIN_SUBJECTS: ['admin', 'subjects'],
  ADMIN_REGISTRATIONS: ['admin', 'registrations'],
  ADMIN_TIMETABLES: (programId) =>
    programId ? ['admin', 'timetables', programId] : ['admin', 'timetables'],

  // Admin individual resource queries
  ADMIN_STUDENT: (id) => ['admin', 'student', id],
  ADMIN_TEACHER: (id) => ['admin', 'teacher', id],
  ADMIN_GUARDIAN: (id) => ['admin', 'guardian', id],
  ADMIN_PROGRAM: (id) => ['admin', 'program', id],
  ADMIN_SUBJECT: (id) => ['admin', 'subject', id],
  ADMIN_TIMETABLE: (id) => ['admin', 'timetable', id],
  ADMIN_REGISTRATION: (id) => ['admin', 'registration', id],

  // Guardian queries
  GUARDIAN_DASHBOARD: ['guardian', 'dashboard'],
  GUARDIAN_STUDENTS: ['guardian', 'students'],
  GUARDIAN_STUDENT_DETAILS: (id) => ['guardian', 'student', id],

  // Teacher queries
  TEACHER_DASHBOARD: ['teacher', 'dashboard'],
  TEACHER_SUBJECTS: ['teacher', 'subjects'],
  TEACHER_TIMETABLE: ['teacher', 'timetable'],

  // Student queries
  STUDENT_DASHBOARD: ['student', 'dashboard'],
  STUDENT_SUBJECTS: ['student', 'subjects'],
  STUDENT_TIMETABLE: ['student', 'timetable'],

  // Shared/Public queries
  PROGRAMS: ['programs'],
  CURRENT_USER: ['currentUser'],

  // Legacy (keep for backward compatibility if needed)
  RECENT_ACTIVITIES: ['recent-activities'],
  WEEKLY_SCHEDULE: (programId) => ['schedule', programId],
}

// ============================================
// Helper Functions
// ============================================

/**
 * Get the dashboard route for a specific role
 * @param {string} role - User role (admin, guardian, teacher, student)
 * @returns {string} Dashboard route path
 */
export const getDashboardRoute = (role) => {
  const routes = {
    admin: ROUTE_PATHS.ADMIN.DASHBOARD,
    guardian: ROUTE_PATHS.GUARDIAN.DASHBOARD,
    teacher: ROUTE_PATHS.TEACHER.DASHBOARD,
    student: ROUTE_PATHS.STUDENT.DASHBOARD,
  }
  return routes[role] || ROUTE_PATHS.HOME
}

/**
 * Check if a route requires authentication
 * @param {string} path - Route path
 * @returns {boolean} True if route is protected
 */
export const isProtectedRoute = (path) => {
  const protectedPrefixes = ['/admin', '/guardian', '/teacher', '/student', '/profile']
  return protectedPrefixes.some(prefix => path.startsWith(prefix))
}

/**
 * Check if a route is for a specific role
 * @param {string} path - Route path
 * @param {string} role - User role
 * @returns {boolean} True if route matches role
 */
export const isRoleRoute = (path, role) => {
  return path.startsWith(`/${role}`)
}