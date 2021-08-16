import { isPrimitive } from '~/utils'

export function MyObject() {}

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
