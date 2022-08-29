interface ITExtends {
  children?: []
  level?
}

/**
 * 数组对象按某个字段排序
 * @param data 源数组
 * @param key 排序字段
 * @param orders 排序方式：asc | desc，默认 asc
 * @returns
 */
export const orderBy = <T>(data: Array<T>, key = 'order', orders = 'asc'): Array<T> => {
  return JSON.parse(JSON.stringify(data)).sort((a, b) => {
    if (orders === 'asc') {
      return a[key] - b[key]
    } else if (orders === 'desc') {
      // 降序
      return b[key] - a[key]
    }
  })
}

/**
 * 列表结构（一维数组）转树结构
 * @param data
 * @param pid
 * @param id
 * @returns
 */
export const list2Tree = <T extends ITExtends>(
  data: Array<T>,
  pid = 'parentId',
  id = 'id'
): Array<T> => {
  const info = data.reduce((map, node) => ((map[node[id]] = node), (node.children = []), map), {})
  return data.filter((node) => {
    info[node[pid]] && info[node[pid]].children.push(node)
    return !node[pid]
  })
}

/**
 * 递归: 列表结构（一维数组）转树结构
 * @param data
 * @param pid
 * @param id
 * @returns
 */
export const array2Tree = <T>({ data, pid = 'parentId', id = 0 }, func?): Array<T> => {
  const tree = []
  let temp
  data.forEach((item) => {
    if (item[pid] === id) {
      if (func) func(item)
      temp = array2Tree({ data, pid, id: item.id }, func)
      if (temp.length > 0) {
        item.children = temp
      }
      tree.push(item)
    }
  })
  return tree
}

/**
 * 递归树结构转列表结构（一维数组）
 * @param tree
 * @param result
 * @param level
 * @returns
 */
export const tree2List = <T extends ITExtends>(
  tree: Array<T>,
  result = [],
  level = 0
): Array<T> => {
  tree.forEach((node) => {
    result.push(node)
    node.level = level + 1
    node.children && tree2List(node.children, result, level + 1)
  })
  return result
}

/**
 * 遍历树结构, 调用 treeForeach(tree, node => { console.log(node.title) })
 * @param tree
 * @param func
 */
export const treeForeach = <T extends ITExtends>(tree: Array<T>, func): void => {
  tree.forEach((data) => {
    data.children && treeForeach(data.children, func) // 遍历子树
    func(data)
  })
}

/**
 * 树结构筛选, 调用 treeFilter(tree, node => { console.log(node.title) })
 * @param tree
 * @param func 传入一个函数描述符合条件的节点
 * @returns
 */
export const treeFilter = <T>(tree, func): Array<T> => {
  // 使用 map 复制一下节点，避免修改到原树结构数据
  return tree
    .map((node) => ({ ...node }))
    .filter((node) => {
      node.children = node.children && treeFilter(node.children, func)
      return func(node) || (node.children && node.children.length)
    })
}

/**
 * 树结构查找, 遍历到满足条件的节点则返回，遍历完成未找到则返回 null
 * 调用 treeFind(tree, node => { console.log(node.title) })
 * @param tree
 * @param func 传入一个函数用于判断节点是否符合条件
 * @returns
 */
export const treeFind = <T extends ITExtends>(tree: Array<T>, func) => {
  for (const data of tree) {
    if (func(data)) return data
    if (data.children) {
      const res = treeFind(data.children, func)
      if (res) return res
    }
  }
  return null
}

/**
 * 深拷贝
 * @param obj 源对象
 * @returns
 */
export const deepCopy = <T>(obj: T) => {
  let newObj = null // 接受拷贝的新对象
  if (typeof obj === 'object' && typeof obj !== null) {
    // 判断是否是引用类型
    newObj = obj instanceof Array ? [] : {} // 判断是数组还是对象
    for (const i in obj) {
      newObj[i] = deepCopy(obj[i]) // 判断下一级是否还是引用类型
    }
  } else {
    newObj = obj
  }
  return newObj
}

/**
 * 过滤参数对象中的空值
 * @param params
 * @returns
 */
export const filterParams = (params) => {
  const newObj = {}
  Object.keys(params).forEach((key) => {
    if (
      (Object.prototype.toString.call(params[key]) === '[object String]' && params[key] !== '') ||
      (Object.prototype.toString.call(params[key]) === '[object Array]' && params[key].length) ||
      Object.prototype.toString.call(params[key]) === '[object Number]' ||
      Object.prototype.toString.call(params[key]) === '[object Boolean]' ||
      Object.prototype.toString.call(params[key]) === '[object Date]'
    ) {
      newObj[key] = params[key]
    }
  })
  return newObj
}
