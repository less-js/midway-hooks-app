import { z } from 'zod'

export const SignInDTO = z.object({
  username: z
    .string()
    .min(3, { message: '用户名不得小于 3 个字符' })
    .max(8, { message: '用户名不得大于 8 个字符' }),
  password: z.string().min(6, { message: '密码不得小于 6 个字符' }),
  // .max(16, { message: '密码不得大于 16 个字符' }),
  captchaKey: z.string().min(1, { message: '验证码 key 不能为空' }),
  captcha: z.string().length(4, { message: '验证码不能为空且只能是 4 个字符' }),
})

export const UserCommonDTO = z.object({
  id: z.number(),
  password: z.string().min(6, { message: '密码不得小于 6 个字符' }),
  // .max(16, { message: '密码不得大于 16 个字符' }),
  name: z
    .string()
    .min(2, { message: '用户名不得小于 2 个字符' })
    .max(6, { message: '用户名不得大于 6 个字符' }),
  nickname: z
    .string()
    .min(1, { message: '昵称不得小于 1 个字符' })
    .max(5, { message: '昵称不得大于 5 个字符' }),
  phone: z.string().regex(/^1[34578]\d{9}$/, { message: '请输入正确的手机号码' }),
  email: z.string().email({ message: '请输入正确的 email 地址' }),
  avatar: z.null().or(z.string().url({ message: '头像地址不正确' })),
  remark: z.string().max(255, { message: '备注不得超过 255 个字符' }),
})

export const PersonMustDTO = z.object({
  username: z
    .string()
    .min(3, { message: '用户名不得小于 3 个字符' })
    .max(16, { message: '用户名不得大于 30 个字符' }),
})
export const PersonPartialDTO = z.object({
  newPassword: z.string().min(6, { message: '密码不得小于 6 个字符' }),
})
export const PersonDTO = PersonMustDTO.merge(PersonPartialDTO.merge(UserCommonDTO).deepPartial())

export const UserMustDTO = z.object({
  roles: z.object({ id: z.number() }).array(),
  departments: z.object({ id: z.number() }).array(),
  status: z.number().gte(0).lte(1),
})
export const UserDTO = UserMustDTO.merge(UserCommonDTO.deepPartial())
