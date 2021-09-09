import { call, instanceOf$, new$ } from '~/common/class'

describe('test impl instance of', () => {
  it('instance of String', () => {
    const res = instanceOf$(new String(), String)
    expect(res).toBe(true)
  })
  it('instance of Parent', () => {
    const res = instanceOf$(new String(), Object)
    expect(res).toBe(true)
  })
  it('Primitive instance of Object', () => {
    const res = instanceOf$('', Object)
    expect(res).toBe(false)
  })
  it('null instance of Object', () => {
    const res = instanceOf$(null, Object)
    expect(res).toBe(false)
  })
  it('define [Symbol.hasInstance] always return false', () => {
    class A {
      static [Symbol.hasInstance]() {
        return false
      }
    }
    const res1 = instanceOf$(new A(), A)
    const res2 = instanceOf$(new A(), Object)
    expect(res1).toBe(false)
    expect(res2).toBe(true)
  })
})

describe('test impl new', () => {
  it('new function', () => {
    function Foo() {
      return
    }
    const obj = new$(Foo)

    expect(Object.getPrototypeOf(obj) === Foo).toBe(true)
  })

  it('new function', () => {
    function Foo() {
      return {}
    }
    const obj = new$(Foo)

    expect(Object.getPrototypeOf(obj) === Foo).toBe(false)
  })

  it('new function', () => {
    function Foo() {
      return ''
    }
    const obj = new$(Foo)

    expect(Object.getPrototypeOf(obj) === Foo).toBe(true)
  })

  it('new function', () => {
    function Foo() {
      // @ts-ignore
      this.a = 1
    }
    const obj = new$(Foo)

    expect(obj.a).toBe(1)

    // @ts-ignore
    function Otaku(name, age) {
      // @ts-ignore
      this.name = name
      // @ts-ignore
      this.age = age

      return 'handsome boy'
    }

    const person = new$(Otaku, 'Kevin', 18)
    expect(person.age).toBe(18)
    expect(person.name).toBe('Kevin')
  })
})

describe('test impl call', () => {
  it('call funcion with non-params', () => {
    const res = call(
      function a(this: any) {
        return this.a
      },
      { a: 1 },
    )
    expect(res).toBe(1)
  })

  it('call funcion with params', () => {
    const res = call(
      function a(this: any, name: string, age: number) {
        return [this.a, name, age]
      },
      { a: 1 },
      'foo',
      12,
    )

    expect(res).toEqual([1, 'foo', 12])
  })

  it('call funcion in null scope', () => {
    const res = call(function a(this: any) {
      return this
    }, null)

    expect(res).toBe(globalThis)
  })

  it('call funcion in non-object scope', () => {
    const res = call(function a(this: any) {
      return this.a
    }, 'adsdsadsad')

    expect(res).toBe(undefined)
  })

  it('call funcion in non-object scope', () => {
    const res = call(function a(this: any) {
      return this.toString()
    }, 12)

    expect(res).toBe('12')
  })

  it('call funcion in BigInt scope', () => {
    const res = call(function a(this: any) {
      return this.toString()
    }, 12n)

    expect(res).toBe('12')
  })

  it('call funcion in array scope', () => {
    const res = call(function a(this: any) {
      return this.toString()
    }, [])

    expect(res).toBe('')
  })
})
