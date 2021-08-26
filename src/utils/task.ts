interface ITask {
  log(...args: Parameters<typeof console.log>): ITask
  wait(second: number): ITask
}
class Task implements ITask {
  time = [] as number[]
  log(...args: any[]) {
    if (this.time.length === 0) {
      console.log(...args, ((+new Date() - start) / 1000) | 0)
    } else {
      const that = this
      const times = [...that.time]
      ;(async function () {
        for (const time of times) {
          await that.#sleep(time)
        }
        console.log(...args, ((+new Date() - start) / 1000) | 0)

        that.time.length = 0
      }.call(this))
    }

    return this
  }

  wait(second: number) {
    this.time.push(second)

    return this
  }

  #sleep(t: number) {
    return new Promise<never>((r) => setTimeout(r, t * 1000))
  }
}
const start = +new Date()
new Task()
  .log(1)
  .wait(1)
  .wait(1)
  .wait(1)
  .wait(1)
  .wait(1)
  .wait(1)
  .wait(1)
  .wait(1)
  .log(2)
  .wait(2)
  .wait(1)
  .log(3)

new Task().log(11).wait(1).log(22).wait(2).wait(1).log(33)
