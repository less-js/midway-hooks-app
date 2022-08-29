import { Get, Api } from '@midwayjs/hooks'
import { ctx } from '../../utils/common'

/**
 * 请求url：/api/test，对应 midway.config.ts 配置项 routes，
 * 如果 Get() 方法中没有参数，请求地址为：/api/open
 */
export const open = Api(Get('/test'), async () => {
  // console.log(ctx().header)
  ctx().ok({ a: 1 })
})
