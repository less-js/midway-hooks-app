// 组件池
export const componentPool = []
const modulesFiles = import.meta.globEager('./*/*/*.vue')
for (const path in modulesFiles) {
  const name = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.vue'))
  if (name.indexOf('La') === 0) componentPool.push(name)
}

// 注册组件
export default {
  install: (app, options) => {
    // 如果第二个参数有值传过来，表示按需加载
    if (options && options.components) {
      // 遍历需要加载的组件
      options.components.map((compName) => {
        // 如果传递过来的组件 name 存在于组件池中则加载组件
        componentPool.map((comp) => {
          if (compName === comp.name) {
            app.component(comp.name, comp)
          }
        })
      })
    } else {
      // 如果没有第二个参数，则全部加载
      componentPool.map((comp) => {
        app.component(comp.name, comp)
      })
    }
  },
}
