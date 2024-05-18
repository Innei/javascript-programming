class L {
  constructor(private name: string) {}

  times: number[] = []

  flag = false

  log(...args: any[]) {
    if (!this.flag) {
      console.log(this.name)
      this.flag = !this.flag
    }

    if (this.times.length === 0) {
      console.log(...args, ((+new Date() - start) / 1000) | 0)
    } else {
      const that = this
      const times = [...that.times]
      ;(async function () {
        for (const time of times) {
          await that._sleep(time)
        }
        console.log(...args, ((+new Date() - start) / 1000) | 0)

        that.times.length = 0
      }).call(this)
    }

    return this
  }

  eat(thing: string) {
    this.log('eat ' + thing + ' ')

    return this
  }

  play(thing: string) {
    this.log('play ' + thing + ' ')

    return this
  }

  sleep(time: number) {
    this.times.push(time)

    return this
  }

  _sleep(t: number) {
    return new Promise((r) => setTimeout(r, t * 1000))
  }
}
const start = +new Date()
const tom = new L('tom')
tom.eat('apple').play('football').sleep(5).eat('apple').play('football')

class Lazyman {
  promise = Promise.resolve()
  eat(thing: string) {
    this.promise = this.promise.then(() => {
      console.log('eat ' + thing)
    })
    return this
  }

  wait(time: number) {
    this.promise = this.promise.then(async () => {
      await sleep(time)
    })
    return this
  }
}

const sleep = (time: number) => new Promise((r) => setTimeout(r, time * 1000))

new Lazyman().eat('apple').wait(3).eat('banana').wait(2).eat('orange')
