import { Get, Api } from '@midwayjs/hooks'
import { ctx } from '../../utils/common'

export const test = Api(Get('/test'), async () => {
  // console.log(ctx().header)
  ctx().ok({ a: 1 })
})
