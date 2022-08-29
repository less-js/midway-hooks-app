import { Api, Get, Post, Delete, Validate } from '@midwayjs/hooks'
import { z } from 'zod'
import { ctx, formatDate } from '../../utils/common'
import UserService, { IUser } from '../../service/user'
import NodeRasService from '../../service/nodeRsa'
import { SignInDTO, PersonDTO, UserDTO } from '../../dto/user'

/**
 * 后台登入
 * @param user
 * @returns Token user
 */
export const signIn = Api(
  Post('/user/sign-in'),
  Validate(SignInDTO),
  async (user: z.infer<typeof SignInDTO>) => {
    const captcha = UserService.checkCaptcha(user.captchaKey, user.captcha)
    if (captcha) {
      const userInfo = await UserService.findUserByUsername(user)
      if (!userInfo) {
        ctx().fail('用户名或密码错误！')
        return
      }
      const token = await UserService.genToken(userInfo)
      if (!token) {
        ctx().fail('token 生成失败！')
        return
      }

      delete userInfo.password
      delete userInfo.roles
      delete userInfo.departments
      ctx().ok({ token, user: userInfo })
    } else {
      ctx().fail('验证码错误！')
    }
  }
)

/**
 * 登录验证
 * @param token
 * @returns
 */
/* export const verifySignIn = Api(
  Post('/user/verify-sign-in'),
  Validate(z.string()),
  async (params) => {
    if (params) {
      const token = params.split(' ')[1]
      try {
        const { secret } = useConfig('jwt')
        const jwtService = await useInject(JwtService)
        await jwtService.verify(token, secret)
        ctx().ok({
          status: 1000,
          message: '已登录',
        })
      } catch (error) {
        ctx().fail({
          status: 1003,
          message: 'token 已过期',
        })
      }
    } else {
      ctx().fail({
        status: 1003,
        message: 'token 不存在',
      })
    }
  }
) */

/**
 * 验证码获取接口
 * @param
 * @returns svg, key
 */
export const captcha = Api(Get('/user/captcha'), async () => {
  try {
    const captcha = UserService.genCaptcha()
    const rsa = NodeRasService.exportRsaKey()
    ctx().ok({
      captcha: {
        svg: captcha.captcha.data, // 验证码
        captchaKey: captcha.captchaKey, // 验证码 session key
      },
      rsa,
    })
  } catch (error) {
    ctx().fail('验证码获取失败！')
  }
})

/**
 * 修改个人信息
 * @param userInfo
 * @returns
 */
export const updatePerson = Api(
  Post('/user/update-person'),
  Validate(PersonDTO),
  async (userInfo: z.infer<typeof PersonDTO>) => {
    try {
      const userResult = await UserService.findUserByUsername({
        username: userInfo.username,
        password: userInfo.password,
      })
      if (userResult) {
        const updatePerson = await UserService.updatePerson(userInfo)
        if (!updatePerson) ctx().fail('更新失败')

        const token = await UserService.genToken(updatePerson)
        delete updatePerson.password

        ctx().ok({ userInfo: updatePerson, token })
      } else {
        ctx().fail('用户名或密码错误')
      }
    } catch (error) {
      ctx().fail(error)
    }
  }
)

/**
 * 获取全部用户
 * @param
 * @returns users
 */
export const getAllUsers = Api(Get('/user/get-all-users'), async () => {
  try {
    const result = await UserService.findMany()
    const users = result.map((item) => {
      return {
        ...item,
        createdAt: formatDate(item.createdAt, true),
        updatedAt: formatDate(item.updatedAt, true),
      }
    })
    if (users) ctx().ok([...users])
  } catch (error) {
    ctx().fail('用户生成失败')
  }
})

/**
 * 添加 & 更新用户
 * @param user
 * @returns
 */
export const editUser = Api(Post('/user/edit'), Validate(UserDTO), async (user: IUser) => {
  try {
    const result = !user.id ? await UserService.create(user) : await UserService.update(user)
    delete result.password
    if (result) ctx().ok({ ...result })
  } catch (error) {
    ctx().fail(error)
  }
})

/**
 * 删除用户
 * @param id
 * @returns
 */
export const deleteUser = Api(Delete('/user/delete'), Validate(z.number()), async (id: number) => {
  try {
    const result = await UserService.delete(id)

    if (result) ctx().ok(result)
  } catch (error) {
    ctx().fail(error)
  }
})

/**
 * 搜索用户
 * @param keyword
 * @returns
 */
export const searchUser = Api(
  Post('/user/search'),
  Validate(z.string()),
  async (keyword: string) => {
    try {
      const result = await UserService.search(keyword)

      if (result) ctx().ok(result)
    } catch (error) {
      ctx().fail(error)
    }
  }
)
