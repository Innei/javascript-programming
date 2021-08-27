import { curry } from '~/utils/curry'

function sum(a: number, b: number, c: number) {
  return a + b + c
}
describe('utils/carry.ts', () => {
  it('should same of plain function', () => {
    let curriedSum = curry(sum)
    const res = curriedSum(1)(2)(3)

    expect(res).toBe(6)
    expect(res).toBe(sum(1, 2, 3))
  })
})
