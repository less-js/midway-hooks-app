import { useContext } from '@midwayjs/hooks'
import { Context, NextFunction } from '@midwayjs/koa'

export default async (next: NextFunction) => {
  const ctx = useContext<Context>()
  try {
    ctx.ok = (data: object, message: string, status: number) => {
      ctx.body = {
        status: status || 1000,
        message: message || 'Success',
        data,
      }
    }

    ctx.fail = (message: string, status: number) => {
      ctx.body = {
        status: status || 1001, // 参数验证失败 1002, token 过期 1003
        message: message || (status === 1002 && 'Validata Fail') || 'Fail', // 参数验证失败 Validata Fail
      }
    }
    await next()
  } catch (error) {
    // zod 验证不通过时
    if (error.status === 422 && error.code === 'HOOKS_VALIDATE_10000') {
      ctx.body = {
        status: error.status,
        message: JSON.parse(error.cause.message),
      }
    } else if (error.clientVersion && error.meta && error.code) {
      // 数据库（prisma）错误
      ctx.body = {
        status: 1001,
        code: error.code,
        message: error.meta.cause,
      }
    } else {
      ctx.body = {
        status: 1001,
        message: error,
      }
    }
  }
}
