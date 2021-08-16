export function isObject(obj: any) {
  if (obj === null) return false
  return typeof obj === 'object' || typeof obj === 'function'
}

export function isPrimitive(obj: any) {
  if (obj === undefined || obj === null) return true
  return !isObject(obj)
}
