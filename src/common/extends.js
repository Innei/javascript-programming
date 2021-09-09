'use strict'
function A(ar) {
  this.foo = 'fooA'
  this.bar = 'bar'
  this.ar = ar
}
A.prototype.bar = '11'
function B() {
  this.constructor.apply(this, arguments) // 关键
  this.foo = 'fooB'
}

B.prototype = Object.create(A.prototype) // 关键
B.prototype.constructor = A // 关键

const b = new B('b')
const a = new A('a')
asserts(B.prototype.constructor, A)
asserts(b.bar, a.bar)
asserts(b.foo, 'fooB')
asserts(a.foo, 'fooA')

function asserts(a, b) {
  if (Object.is(a, b)) {
    return
  }
  throw new Error('asserts error')
}
