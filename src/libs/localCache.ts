export const LOCK_SCREEN_TIME = "LOCK_SCREEN_TIME"
export const LOCKING_SCREEN_STATUS = "LOCKING_SCREEN_STATUS"
export const DOCUMENT_ZOOM = "DOCUMENT_ZOOM"
export const COMMAND_PALLETES_STATUS = "COMMAND_PALLETES_STATUS"
export const CURRENT_PAD_CONTENT = "CURRENT_PAD_CONTENT"

export const setCacheJSON = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const setCache = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

export const getCacheArray = (key: string) => {
  const value = JSON.parse(localStorage.getItem(key) || "[]")
  return value.length ? value : null
}

export const getCacheJSON = (key: string, defaultValue?: any) => {
  return JSON.parse(
    localStorage.getItem(key) || JSON.stringify(defaultValue) || "{}"
  )
}

export const getCache = (key: string) => {
  return localStorage.getItem(key)
}
