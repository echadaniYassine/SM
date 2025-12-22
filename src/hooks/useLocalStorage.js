// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      
      // Handle null, undefined string, or empty values
      if (!item || item === 'undefined' || item === 'null') {
        return initialValue
      }
      
      return JSON.parse(item)
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      // Clear corrupted data
      window.localStorage.removeItem(key)
      return initialValue
    }
  })

  const setStoredValue = (newValue) => {
    try {
      setValue(newValue)
      
      // Only store if value is not undefined
      if (newValue !== undefined) {
        window.localStorage.setItem(key, JSON.stringify(newValue))
      } else {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  // Sync across tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        try {
          // Handle removal
          if (!e.newValue || e.newValue === 'undefined' || e.newValue === 'null') {
            setValue(initialValue)
            return
          }
          
          setValue(JSON.parse(e.newValue))
        } catch (error) {
          console.error(`Error parsing localStorage key "${key}":`, error)
          setValue(initialValue)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, initialValue])

  return [value, setStoredValue]
}