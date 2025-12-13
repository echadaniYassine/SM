// src/api/errors.js
export class ApiError extends Error {
  constructor(error) {
    super(error.message || 'An API error occurred')
    this.name = 'ApiError'
    this.status = error.response?.status
    this.data = error.response?.data
    this.originalError = error
  }
}

export const handleApiError = (error) => {
  if (error.response?.status === 401) {
    const isAuthPage = ['/login', '/register', '/forgot-password'].includes(
      window.location.pathname
    )

    if (!isAuthPage) {
      localStorage.removeItem('auth-storage')
      window.location.replace('/login')
    }
  }

  return Promise.reject(error)
}
