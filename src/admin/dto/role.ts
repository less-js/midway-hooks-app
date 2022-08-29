import { z } from 'zod'

export const RoleDTO = z
  .object({
    name: z.string(),
  })
  .merge(
    z
      .object({
        id: z.null().or(z.number()),
        label: z.string().nullable(),
        remark: z.string().nullable(),
      })
      .deepPartial()
  )
