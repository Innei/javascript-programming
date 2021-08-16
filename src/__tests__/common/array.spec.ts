import { MyArray } from '~/common/array'

describe('test array', () => {
  it('should have the same behavior as "Array.map" 1', async () => {
    const mArr = new MyArray(1, 2, 34)
    expect(mArr.map((i) => i + 1)).toStrictEqual([1, 2, 34].map((i) => i + 1))
  })

  it('should have the same behavior as "Array.map" 2', async () => {
    const mArr = new MyArray(1, 2, 34)
    expect(mArr.map((i, index) => i + index)).toStrictEqual(
      [1, 2, 34].map((i, index) => i + index),
    )
  })

  it('should have the same behavior as "Array.map" 3', async () => {
    const mArr = new MyArray(1, 2, 34)
    expect(
      mArr.map((i, index, thisarr) => i + index + thisarr[0]),
    ).toStrictEqual(
      [1, 2, 34].map((i, index, thisarr) => i + index + thisarr[0]),
    )
  })
})
