import { tree } from '~/common/tree'

describe('test tree', () => {
  it('case-1', () => {
    const res = tree(['A', 'A.B', 'A.B.C', 'A.C', 'A.C.D'])
    expect(res).toEqual([
      {
        name: 'A',
        children: [
          { name: 'B', children: [{ name: 'C' }] },
          { name: 'C', children: [{ name: 'D' }] },
        ],
      },
    ])
  })
  it('case-2', () => {
    const res = tree(['A', 'A.B', 'C', 'C.D'])
    expect(res).toEqual([
      {
        name: 'A',
        children: [{ name: 'B' }],
      },
      {
        name: 'C',
        children: [{ name: 'D' }],
      },
    ])
  })
})
