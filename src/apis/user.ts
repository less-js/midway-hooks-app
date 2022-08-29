import http from '../utils/http'
import { ICaptcha, IRsa, ISignInUser, ITokenUser, IUser, IPerson } from '@/types/user'

/**
 * 获取验证码
 * @returns
 */
export const getCaptcha = async () => {
  return await http.get<{ captcha: ICaptcha; rsa: IRsa }>('user/captcha')
}

/**
 * 管理员登录
 * @param obj
 * @returns
 */
export const signIn = async (obj: ISignInUser) => {
  return await http.post<ITokenUser>('user/sign-in', {
    username: obj.username,
    password: obj.password,
    captchaKey: obj.captchaKey,
    captcha: obj.captcha,
  })
}

/**
 * 登录验证
 * @param params
 * @returns
 */
export const verifySignIn = async (params: string) => {
  return await http.post('user/verify-sign-in', params)
}

/**
 * 获取 rsa 公钥
 * @returns
 */
export const getRsaKey = async () => {
  return await http.get<IRsa>('get-rsa-key')
}

/**
 * 修改个人信息
 * @param data
 * @returns
 */
export const updatePerson = async (data: IPerson) => {
  return await http.post<{
    userInfo: IUser
    token: string
  }>('user/update-person', data)
}

/**
 * 获取全部角色
 * @returns
 */
export const getAllUsers = async () => {
  return await http.get<IUser[]>('user/get-all-users')
}

/**
 * 添加 & 编辑角色
 * @param user
 * @returns
 */
export const editUser = async (user: IUser) => {
  return await http.post<IUser>('user/edit', user)
}

/**
 * 删除角色
 * @param id
 * @returns
 */
export const deleteUser = async (id: number) => {
  return await http.delete<IUser>('user/delete', id)
}

/**
 * 搜索角色
 * @param keyword
 * @returns
 */
export const searchUser = async (keyword: string) => {
  return await http.post<IUser[]>('user/search', keyword)
}
