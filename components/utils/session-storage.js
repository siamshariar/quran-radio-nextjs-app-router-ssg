
const isBrowser = typeof window !== "undefined"

export const getSessionItem = (key) => {
  if (!isBrowser) return null
  try {
    return sessionStorage.getItem(key)
  } catch (error) {
    console.error("Error accessing sessionStorage:", error)
    return null
  }
}

export const setSessionItem = (key, value) => {
  if (!isBrowser) return false
  try {
    sessionStorage.setItem(key, value)
    return true
  } catch (error) {
    console.error("Error writing to sessionStorage:", error)
    return false
  }
}

export const removeSessionItem = (key) => {
  if (!isBrowser) return false
  try {
    sessionStorage.removeItem(key)
    return true
  } catch (error) {
    console.error("Error removing from sessionStorage:", error)
    return false
  }
}


export const getSessionNumber = (key, defaultValue = 0) => {
  const value = getSessionItem(key)
  if (value === null) return defaultValue

  const parsed = Number.parseInt(value, 10)
  return Number.isNaN(parsed) ? defaultValue : parsed
}