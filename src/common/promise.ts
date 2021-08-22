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

async function asyncPool(
  poolLimit: number,
  array: any[],
  iteratorFn: Function,
) {
  const ret = []
  const executing: Promise<unknown>[] = []
  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item, array))
    ret.push(p)

    if (poolLimit <= array.length) {
      const e = p.then(() =>
        executing.splice(executing.indexOf(e), 1),
      ) as Promise<unknown>
      executing.push(e)
      if (executing.length >= poolLimit) {
        await Promise.race(executing)
      }
    }
  }
  return Promise.all(ret)
}
