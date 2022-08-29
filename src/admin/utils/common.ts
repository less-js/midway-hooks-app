import { useContext } from '@midwayjs/hooks'
import { Context } from '@midwayjs/koa'

interface IContext extends Context {
  fail?: any
  ok?: any
}

export const ctx = (): IContext => useContext<IContext>()

/**
 * 格式化日期时间
 * @param dataTime
 * @param time 如果为 true 则格式化时间，否则格式化日期
 * @returns
 */
export const formatDate = (dataTime?: Date, time?: boolean): string => {
  const date = dataTime || new Date()
  const year = date.getFullYear()
  let month = (date.getMonth() + 1).toString()
  let day = date.getDate().toString()
  let hours = date.getHours().toString()
  let minutes = date.getMinutes().toString()
  let seconds = date.getSeconds().toString()

  if (parseInt(month) >= 1 && parseInt(month) <= 9) month = '0' + month
  if (parseInt(day) >= 0 && parseInt(day) <= 9) day = '0' + day
  if (parseInt(hours) >= 0 && parseInt(hours) <= 9) hours = '0' + hours
  if (parseInt(minutes) >= 0 && parseInt(minutes) <= 9) minutes = '0' + minutes
  if (parseInt(seconds) >= 0 && parseInt(seconds) <= 9) seconds = '0' + seconds

  if (!time) {
    return year + '-' + month + '-' + day
  } else {
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
  }
}

/**
 * 查找所有子节点的 id
 * @param data
 * @param pid
 * @param id
 * @returns 返回值中不包含自己
 */
export const findChildIds = (data, id, pid = 'parentId'): number[] => {
  const array = []
  const ids = []
  let temp
  data.forEach((item) => {
    if (item[pid] === id) {
      temp = findChildIds(data, item.id, pid)
      if (temp.length > 0) {
        ids.push(...temp)
      }
      array.push(item)
      ids.push(item.id)
    }
  })
  return ids
}
