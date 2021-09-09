import { isObject, isPrimitive } from '~/utils'

/**
 * 实现 instanceOf
 * @param obj
 * @param type
 * @returns
 */
export function instanceOf$(obj: any, type: any) {
  if (isPrimitive(obj)) return false
  if (!isObject(type))
    throw new TypeError("Right-hand side of ' instanceof ' is not an object")

  let cur = Object.getPrototypeOf(obj)

  while (cur) {
    if (cur.constructor === type && cur.constructor[Symbol.hasInstance](obj))
      return true
    cur = Object.getPrototypeOf(cur)
  }

  return false
}

/**
 * 实现 new, 相对 ES5 的构造函数, ES6 的 class 只能用原生 new
 * @see: https://stackoverflow.com/questions/51860043/javascript-es6-typeerror-class-constructor-client-cannot-be-invoked-without-ne
 */
export function new$(func: any, ...args: any[]) {
  if (isPrimitive(func) || !('constructor' in func))
    throw new TypeError(`${func} is not a constructor`)
  const obj = new Object() as any
  const r = func.call(obj, ...args)
  Object.setPrototypeOf(obj, func)
  obj.prototype.constructor = func

  return typeof r === 'object' && r ? r : obj
}
/**
 * 实现一个 call
 */
export function call(this: any, func: Function, scope: any, ...args: any[]) {
  if (typeof func !== 'function')
    throw new TypeError('first argument must be function')

  if (scope) {
    const key = Symbol()
    scope = Object(scope)
    scope[key] = func

    return scope[key](...args)
  } else {
    // for null
    const key = Symbol()
    Reflect.set(globalThis, key, func)
    // @ts-ignore
    const res = globalThis[key](...args)

    Reflect.deleteProperty(globalThis, key)
    return res
  }
}
