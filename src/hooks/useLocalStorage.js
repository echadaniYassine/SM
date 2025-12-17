// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setStoredValue = (newValue) => {
    try {
      setValue(newValue)
      window.localStorage.setItem(key, JSON.stringify(newValue))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  // ✅ Added: Sync across tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue) {
        try {
          setValue(JSON.parse(e.newValue))
        } catch (error) {
          console.error(`Error parsing localStorage key "${key}":`, error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key])

  return [value, setStoredValue]
}