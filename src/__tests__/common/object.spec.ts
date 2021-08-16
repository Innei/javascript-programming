import { MyObject } from '~/common/object'

describe('test impl object.create', () => {
  it('is a in new obj', () => {
    const obj = MyObject.create({ a: 1 })
    expect(obj.a === 1).toBe(true)
  })

  it('is create null object is empty obj', () => {
    const obj = MyObject.create(null)
    expect(obj).toEqual({})
  })

  it('is a in __proto__', () => {
    const obj = MyObject.create({ a: 1 })
    obj.a = 2

    const aInProto = Object.getPrototypeOf(obj).a
    expect(aInProto).toBe(1)
  })
})
