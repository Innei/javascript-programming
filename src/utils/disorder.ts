export const disorder = (arr: any[]) => {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * len)
    const temp = arr[i]
    arr[i] = arr[randomIndex]
    arr[randomIndex] = temp
  }
  return arr
}
