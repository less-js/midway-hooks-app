import { useConfig, useInject, useContext } from '@midwayjs/hooks'
import { Context, NextFunction } from '@midwayjs/koa'
import { JwtService } from '@midwayjs/jwt'
import UserService from '../service/user'

export default async (next: NextFunction) => {
  const ctx = useContext<Context>()
  const { secret } = useConfig('jwt')

  // ctx.path === '/api' 为测试数据，对应 midway.config.ts 配置项 routes
  if (ctx.path === '/sys/user/sign-in' || ctx.path === '/sys/user/captcha' || ctx.path === '/api') {
    await next()
  } else {
    const token = ctx.request.header.authorization.split(' ')[1]
    if (token) {
      const jwtService = await useInject(JwtService)
      try {
        await jwtService.verify(token, secret)
        await next()
      } catch (error) {
        ctx.body = {
          status: 1003,
          message: 'token 已过期',
        }
        const tokenResult = await UserService.decodeToken()
        if (!tokenResult) {
          ctx.fail('获取角色权限失败.')
        } else {
          const { username, password } = tokenResult
          const userInfo = await UserService.findUserByUsername({ username, password })
          const newToken = await UserService.genToken(userInfo)
          ctx.res.setHeader('authorization', newToken)
        }
      }
    } else {
      ctx.body = {
        status: 1003,
        message: 'token 不存在',
      }
      // ctx.fail('token 不存在', 1003)
    }
  }
}
