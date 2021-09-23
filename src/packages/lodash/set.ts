function _() {}

_.set = function (target: any, path: string | string[], value: any) {
  if (Object(target) !== target) {
    return target
  }
  if (!Array.isArray(path)) {
    // 非 .[] 的字符匹配
    // foo.bar[0] => ['foo', 'bar', '0']
    path = path.match(/[^.[\]]+/g) || []
  }
  // slice(0, -1) 去掉最后一个元素
  path.slice(0, -1).reduce((target, currentPath, index) => {
    // target -> currentPath 是对象吗
    if (Object(target[currentPath]) === target[currentPath]) {
      return target[currentPath]
    } else {
      // 不是对象的话 看看下一个 key 是数字吗 ,数字的话当前路径要给个数组

      target[currentPath] = !isNaN(+path[index + 1]) ? [] : {}
      return target[currentPath]
    }
    // 给最后一个路径附上值
  }, target)[path[path.length - 1]] = value
}

const obj2 = {}
_.set(obj2, 'foo.bar[0].baz[1]', 'qux')
console.log(obj2)
