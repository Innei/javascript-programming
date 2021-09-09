import { isPrimitive } from '~/utils'

export function MyObject(this: any, obj: any) {
  return this.constructor.call(this, obj)
}

MyObject.prototype = Object.create(Object.prototype)
MyObject.prototype.constructor = Object

function createObject<T extends object>(obj: T): T
function createObject(obj: null): {}
function createObject(obj: any) {
  if (obj === null) {
    return {}
  }
  if (isPrimitive(obj))
    throw new TypeError('Object prototype may only be an Object or null')

  const newObj = {}
  Object.setPrototypeOf(newObj, obj)
  return newObj
}

MyObject.create = createObject
MyObject.prototype.flatten = function flatten(this: any) {
  const obj = createObject(this)
  for (const key in this) {
    if (this.hasOwnProperty(key)) {
      const value = this[key]
      if (isPrimitive(value)) {
        obj[key] = value
      } else {
        obj[key] = value.flatten()
      }
    }
  }
  return obj
}
