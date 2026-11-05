import { useEffect, useState } from 'react'

// Step 1: a custom hook. Same shape as useState, but the value survives a page refresh.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue // convert stored text back to object
    } catch {
      return initialValue
    }
  })

  // save changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) { // check for invalid json or unavailable string
      console.error(`Could not save ${key}`, error)
    }
  }, [key, value])

  return [value, setValue]
}