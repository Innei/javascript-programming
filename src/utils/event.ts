class EventEmitter<T extends string> {
  #onceSymbol = Symbol()
  eventMap = {} as Record<T, Function[]>

  on(name: T, caller: () => any) {
    const list = this.eventMap[name]
    if (!list) {
      this.eventMap[name] = [caller]
    } else {
      list.push(caller)
    }
  }

  emit(name: T, ...args: any[]) {
    const list = this.eventMap[name]
    if (!list || list.length) {
      return
    }
    for (let i = 0; i < list.length; i++) {
      const caller = list[i]
      caller.apply(this, args)

      if (Reflect.get(caller, this.#onceSymbol)) {
        // @ts-ignore
        this.eventMap[name][i] = null
      }
    }

    this.eventMap[name] = this.eventMap[name].filter(Boolean)
  }

  off(name: T, caller?: () => any) {
    const list = this.eventMap[name]
    if (!list) {
      return
    }
    if (!caller) {
      this.eventMap[name].length = 0
    } else {
      const index = list.findIndex((c) => c === caller)
      if (~index) {
        this.eventMap[name].splice(index, 1)
      }
    }
  }

  once(name: T, caller: () => any) {
    Reflect.defineProperty(caller, this.#onceSymbol, { value: true })

    this.on(name, caller)
  }
}
