export const ROUTE_PATHS = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
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
  GUARDIAN: {
    DASHBOARD: '/guardian/dashboard',
    STUDENTS: '/guardian/students',
  },
  TEACHER: {
    DASHBOARD: '/teacher/dashboard',
    SUBJECTS: '/teacher/subjects',
    TIMETABLE: '/teacher/timetable',
  },
  STUDENT: {
    DASHBOARD: '/student/dashboard',
    TIMETABLE: '/student/timetable',
    SUBJECTS: '/student/subjects',
  },
}
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/user',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/email/verify', // + /{id}/{hash}
    RESEND_VERIFICATION: '/email/resend',
  },
  PROGRAMS: '/programs',
  STUDENTS: '/students',
  TEACHERS: '/teachers',
  GUARDIAN: {
    STUDENTS: '/guardian/students',
    STUDENT_DETAILS: (id) => `/guardian/students/${id}`,
  },
  REGISTRATIONS: '/registrations',
  TIMETABLES: '/timetables',
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_STATISTICS: '/admin/statistics',

}


export const QUERY_KEYS = {
  ADMIN_STUDENTS: ['admin-students'],
  ADMIN_TEACHERS: ['admin-teachers'],
  ADMIN_GUARDIANS: ['admin-guardians'],
  ADMIN_PROGRAMS: ['admin-programs'],
  ADMIN_REGISTRATIONS: ['admin-registrations'],
  RECENT_ACTIVITIES: ['recent-activities'],
  ADMIN_TIMETABLES: (programId) => ['admin', 'timetables', programId], // ADD THIS
  WEEKLY_SCHEDULE: (programId) => ['schedule', programId], // ADD THIS
}