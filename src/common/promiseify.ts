// fs.readFile(path, (err, data) => { });

export const promisify = (fn: Function) => {
  return (...args: any[]) =>
    new Promise((resolve, reject) => {
      fn(...args, (err: Error, data: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
}
