import { isObject, isPrimitive } from '~/utils'
describe('utils/index.ts', () => {
  it('should be object', () => {
    expect(isObject({})).toBe(true)
    expect(isObject([])).toBe(true)
    expect(isObject(null)).toBe(false)
    expect(isObject(function () {})).toBe(true)
    expect(isObject(new (class {})())).toBe(true)
    expect(isObject(0)).toBe(false)
  })

  it('should be primitive', () => {
    expect(isPrimitive(undefined)).toBe(true)
    expect(isPrimitive(null)).toBe(true)
    expect(isPrimitive(0)).toBe(true)
    expect(isPrimitive(true)).toBe(true)
    expect(isPrimitive('')).toBe(true)
    expect(isPrimitive({})).toBe(false)
    expect(isPrimitive([])).toBe(false)
    expect(isPrimitive(function () {})).toBe(false)
    expect(isPrimitive(new (class {})())).toBe(false)
  })
})
