export const debounce = <T extends Function>(
  fn: T,
  timeout: number,
  options = { leading: false, tailing: false },
) => {
  let timer: any
  const { leading, tailing } = options
  return function (this: any, ...args: any[]) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.call(this, ...args)
    }, timeout)
  }
}
