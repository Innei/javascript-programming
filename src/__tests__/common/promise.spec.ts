import { MyPromise } from '~/common/promise'

describe('test promise.all', () => {
  it('should have the same behavior as "Promise.all" 1', async () => {
    const d1 = [1, 2, 3]
    const res = await MyPromise.all(d1)
    expect(res).toStrictEqual(await Promise.all(d1))
  })

  it('should have the same behavior as "Promise.all" 2', async () => {
    const d1 = [1, 2, Promise.reject(4)]
    try {
      await MyPromise.all(d1)
    } catch (e1) {
      try {
        await Promise.all(d1)
      } catch (e2) {
        expect(e1).toStrictEqual(e2)
      }
    }
  })

  it('should have the same behavior as "Promise.all" 2', async () => {
    const d1 = [1, Promise.resolve({ a: 1 })]
    const res = await MyPromise.all(d1)
    // @ts-ignore
    expect(res).toStrictEqual(await Promise.all(d1))
  })
})
