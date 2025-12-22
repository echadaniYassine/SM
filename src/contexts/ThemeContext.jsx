// src/contexts/ThemeContext.jsx
import { createContext, useContext, useEffect } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

const ThemeContext = createContext({
  theme: 'system',
  setTheme: () => { },
  toggleTheme: () => { }
})

const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('theme', THEMES.SYSTEM)

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement

    // Remove all theme classes
    root.classList.remove(THEMES.LIGHT, THEMES.DARK)

    if (theme === THEMES.SYSTEM) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? THEMES.DARK
        : THEMES.LIGHT
      root.classList.add(systemTheme)
    } else if (theme === THEMES.LIGHT || theme === THEMES.DARK) {
      root.classList.add(theme)
    } else {
      // Invalid theme value, default to system
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? THEMES.DARK
        : THEMES.LIGHT
      root.classList.add(systemTheme)
    }
  }, [theme])

  // Listen for system theme changes when using system theme
  useEffect(() => {
    if (theme === THEMES.SYSTEM) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      const handleChange = (e) => {
        const root = window.document.documentElement
        root.classList.remove(THEMES.LIGHT, THEMES.DARK)
        root.classList.add(e.matches ? THEMES.DARK : THEMES.LIGHT)
      }

      // Add listener
      mediaQuery.addEventListener('change', handleChange)

      // Cleanup
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => {
      // Only toggle between light and dark (not system)
      if (prev === THEMES.LIGHT) return THEMES.DARK
      if (prev === THEMES.DARK) return THEMES.LIGHT
      // If system, default to dark
      return THEMES.DARK
    })
  }

  const value = {
    theme,
    setTheme,
    toggleTheme,
    themes: THEMES
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}