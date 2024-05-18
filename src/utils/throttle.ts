export const throttle = (fn: Function, delay: number) => {
  let last = 0
  let timer: any = null
  return (...args: any[]) => {
    const now = +new Date()
    if (now - last >= delay) {
      last = now
      fn(...args)
    } else if (!timer) {
      timer = setTimeout(() => {
        last = now
        fn(...args)
        clearTimeout(timer)
        timer = null
      }, delay - (now - last))
    }
  }
}
