import { useInject, useConfig } from '@midwayjs/hooks'
import { JwtService } from '@midwayjs/jwt'
import { Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'
import svgCaptcha from 'svg-captcha'
import { v4 as uuid } from 'uuid'
import { z } from 'zod'
import { prisma } from '../utils/prisma'
import { ctx } from '../utils/common'
import { SignInDTO } from '../dto/user'
import { SysUser, SysDepartment, SysRole } from '@prisma/client'
import NodeRasService from './nodeRsa'

interface ICaptcha {
  captchaKey: string
  captcha: {
    text: string
    data: string
  }
}
export interface IUser extends SysUser {
  roles: SysRole[]
  departments: SysDepartment[]
}

class UserService {
  /**
   * generate captcha
   * @param
   * @returns captcha
   */
  genCaptcha(): ICaptcha {
    const captcha = svgCaptcha.create({
      size: 4, // 验证码长度
      width: 120,
      height: 38,
      fontSize: 46,
      ignoreChars: '0oO1ilIagq', // 验证码字符中排除 0o1i
      noise: 2, // 干扰线条的数量
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: '#999', // 验证码图片背景颜色
    })

    const captchaKey = uuid()
    ctx().session[captchaKey] = captcha.text // 把验证码赋值给 session
    return {
      captchaKey,
      captcha,
    }
  }

  /**
   * Check captcha
   * @param key, code
   * @param code
   * @returns
   */
  checkCaptcha(key: string, code: string): boolean {
    const captcha = ctx().session[key].toLowerCase()
    if (captcha === code.toLowerCase()) return true
    return false
  }

  /**
   * Generate token
   * @param username
   * @returns Token
   */
  async genToken(userInfo): Promise<string> {
    try {
      const { secret, expiresIn } = useConfig('jwt')
      const jwtService = await useInject(JwtService)

      const roleIds = []
      const departmentIds = []
      const { username, password, roles, departments } = userInfo
      roles.forEach((item) => roleIds.push(item.id))
      departments.forEach((item) => departmentIds.push(item.id))

      const token = await jwtService.sign(
        {
          username,
          password,
          roleIds,
          departmentIds,
        },
        secret,
        {
          expiresIn,
        }
      )

      return `Bearer ${token}`
    } catch (error) {
      if (error) throw error
    }
  }

  /**
   * token 解码
   * @param
   * @returns
   */
  async decodeToken(): Promise<any> {
    const token = ctx().request.header.authorization.split(' ')[1]
    const { secret } = useConfig('jwt')
    const jwtService = await useInject(JwtService)
    try {
      const { username, password, roleIds, departmentIds } = await jwtService.verify(token, secret)
      return { username, password, roleIds, departmentIds }
    } catch (error) {
      if (error) throw error
    }
  }

  /**
   * Find user by username
   * @param user
   * @returns user
   */
  async findUserByUsername(user: z.infer<typeof SignInDTO>): Promise<IUser> {
    try {
      const userInfo = await prisma.sysUser.findUnique({
        where: {
          username: user.username,
        },
        include: {
          roles: true,
          departments: true,
        },
      })
      if (!userInfo) return

      // 密码与数据库做对比
      const pwd = NodeRasService.decryptRasKey(user.password)
      const isLegalUser = await bcrypt.compare(pwd, userInfo.password)
      if (!isLegalUser) return

      return { ...userInfo }
    } catch (error) {
      if (error) throw error
    }
  }

  /**
   * 更新个人信息
   * @param user
   * @returns
   */
  async updatePerson(user): Promise<SysUser> {
    try {
      const oldPassword = user.password && NodeRasService.decryptRasKey(user.password)
      const newPassword = user.newPassword ? NodeRasService.decryptRasKey(user.newPassword) : ''
      const pwd = await bcrypt.hash(newPassword === '' ? oldPassword : newPassword, 10)

      const updatePerson = await prisma.sysUser.update({
        where: {
          id: user.id,
        },
        data: {
          password: pwd,
          username: user.username,
          nickname: user.nickname || null,
          name: user.name || null,
          phone: user.phone || null,
          email: user.email || null,
          avatar: user.avatar || null,
          remark: user.remark || null,
        },
        include: {
          roles: true,
          departments: true,
        },
      })
      return updatePerson
    } catch (error) {
      console.log(error)
      if (error) throw error
    }
  }

  /**
   * 获取全部用户
   * @returns
   */
  async findMany() {
    try {
      return await prisma.sysUser.findMany({
        select: {
          id: true,
          username: true,
          name: true,
          nickname: true,
          avatar: true,
          email: true,
          phone: true,
          remark: true,
          status: true,
          roles: true,
          departments: true,
          createdAt: true,
          updatedAt: true,
        },
      })
    } catch (error) {
      if (error) throw error
    }
  }

  /**
   * 添加新用户
   * @param user
   * @returns
   */
  async create(user: IUser): Promise<SysUser> {
    try {
      // 默认密码： 123456
      let password = '$2b$10$La3gnzue6GKv0c3XMcZoyu.WKApl6uOouoVlSiYjnynB1GSeuaTTW'
      if (user.password) {
        const pwd = NodeRasService.decryptRasKey(user.password)
        password = await bcrypt.hash(pwd, 10)
      }
      return await prisma.sysUser.create({
        data: {
          ...user,
          password,
          roles: {
            connect: user.roles,
          },
          departments: {
            connect: user.departments,
          },
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          if (error.meta.target === 'sys_users_username_key') throw '用户名称已存在'
          if (error.meta.target === 'sys_users_phone_key') throw '手机号码已存在'
          if (error.meta.target === 'sys_users_email_key') throw '邮箱已存在'
        }
      }
      throw error
    }
  }

  /**
   * 更新用户
   * @param user
   * @returns
   */
  async update(user: IUser): Promise<SysUser> {
    delete user.createdAt
    delete user.updatedAt
    try {
      return await prisma.sysUser.update({
        where: { id: user.id },
        data: {
          ...user,
          name: user.name || null,
          nickname: user.nickname || null,
          avatar: user.avatar || null,
          email: user.email || null,
          phone: user.phone || null,
          remark: user.remark || null,
          roles: {
            set: [],
            connect: user.roles,
          },
          departments: {
            set: [],
            connect: user.departments,
          },
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          if (error.meta.target === 'sys_users_username_key') throw '用户名称已存在'
          if (error.meta.target === 'sys_users_phone_key') throw '手机号码已存在'
          if (error.meta.target === 'sys_users_email_key') throw '邮箱已存在'
        }
      }
      if (error) throw error
    }
  }

  /**
   * 删除用户
   * @param id
   * @returns
   */
  async delete(id: number) {
    try {
      return await prisma.sysUser.delete({
        where: { id },
      })
    } catch (error) {
      if (error) throw error
    }
  }

  /**
   * 搜索
   * @param keyword
   * @returns
   */
  async search(keyword: string) {
    try {
      return await prisma.sysUser.findMany({
        where: {
          name: {
            contains: keyword,
          },
        },
      })
    } catch (error) {
      if (error) throw error
    }
  }
}

export default new UserService()
