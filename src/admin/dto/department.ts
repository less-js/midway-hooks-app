import { z } from 'zod'

export const DepartmentDTO = z
  .object({
    name: z.string(),
  })
  .merge(
    z
      .object({
        id: z.null().or(z.number()),
        parentId: z.number().nullable(),
        order: z.number().nullable(),
      })
      .deepPartial()
  )
