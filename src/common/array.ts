export class MyArray<T> extends Array<T> {
  // @ts-ignore
  override map(cb: (item: T, index: number, thisArr: this) => T) {
    // @ts-ignore
    return this.reduce(function (arr, item, index, thisArr) {
      //@ts-ignore
      const res = cb(item, index, thisArr)
      return [...arr, res]
    }, [])
  }
}
