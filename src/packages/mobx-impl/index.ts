import 'reflect-metadata'
// TODO
const observable: PropertyDecorator = (target, key) => {
  // @ts-ignore
  console.log(target[key])

  new Proxy(target, {
    get() {
      return key
    },
  })
}

class Foo {
  @observable a = 1
}

new Foo()
