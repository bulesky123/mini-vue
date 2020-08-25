class Observer {
  constructor(data) {
    this.walk(data)
  }
  // 遍历 data($data)中的属性，把属性转换成响应式数据
  walk(data) {
    if (!data || typeof data !== 'object') {
      return
    }
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key])
    })
  }
  // 定义响应式数据
  defineReactive(obj, key, value) {
    const that = this
    // 利用递归使深层（内部）属性转换成响应式数据
    this.walk(value)
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        return value
      },
      set(newValue) {
        if (value === newValue) {
          return
        }
        value = newValue
        that.walk(newValue)
      }
    })
  }
}