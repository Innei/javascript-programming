// @ts-ignore
export class MyPromise<T> implements Promise<T> {
  /** 实现 Promise.all */
  static all(iterator: any[]) {
    const result: any[] = []
    const len = iterator.length

    return new Promise((resolve, reject) => {
      iterator.forEach((resolveable, index) => {
        Promise.resolve(resolveable)
          .then((res) => {
            result[index] = res
            if (result.filter(Boolean).length === len) {
              resolve(result)
            }
          })
          .catch((reason) => {
            reject(reason)
          })
      })
    })
  }
}
