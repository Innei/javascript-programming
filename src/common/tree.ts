// 输入用'.'分隔的字符串数组，如['A', 'A.B', 'A.B.C', 'A.C', 'A.C.D']，
// 转换成树状结构。
/* [
  {
    name: 'A',
    children: [
      { name: 'B', children: [{ name: 'C' }] },
      { name: 'C', children: [{ name: 'D' }] },
    ],
  },
]
 */
export function tree(arr: string[], res: any[] = []): any[] {
  arr.forEach((item) => {
    const [name, ...children] = item.split('.')
    const node = res.find((node) => node.name === name)
    if (node) {
      if (children.length) {
        node.children = tree([children.join('.')], node.children || [])
      }
    } else {
      const obj = { name }
      if (children.length) {
        // @ts-ignore
        obj['children'] = tree([children.join('.')], [])
      }
      res.push(obj)
    }
  })
  return res
}
