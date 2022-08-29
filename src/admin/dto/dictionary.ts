import { z } from 'zod'

export const DictionaryDTO = z
  .object({
    name: z.string(),
    status: z.boolean(),
  })
  .merge(
    z
      .object({
        id: z.null().or(z.number()),
        alias: z.string().nullable(),
        enumElements: z.array(
          z.object({
            isEnable: z.boolean(),
            label: z.string(),
            value: z.string().or(z.number()),
            remark: z.string().nullable(),
          })
        ),
        enumElementType: z.string().nullable(),
      })
      .deepPartial()
  )
