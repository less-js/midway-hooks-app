import { z } from 'zod'

export const MenuMustDTO = z.object({
  name: z.string(),
  routeName: z.string(),
  routePath: z.string(),
  component: z.string(),
  parentId: z.number(),
  roles: z.object({ id: z.number() }).array(),
  departments: z.object({ id: z.number() }).array(),
})
export const MenuPartialDTO = z.object({
  id: z.number(),
  redirect: z.string().nullable(),
  icon: z.string().nullable(),
  externalLink: z.string().url({ message: '外链地址不正确' }).nullable(),
  isAuth: z.boolean().nullable(),
  order: z.number().nullable(),
  isCache: z.boolean().nullable(),
  hidden: z.boolean().nullable(),
  status: z.boolean().nullable(),
})
export const MenuDTO = MenuMustDTO.merge(MenuPartialDTO.deepPartial())
