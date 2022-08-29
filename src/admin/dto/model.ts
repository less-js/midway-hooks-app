import { z } from 'zod'

export const ModelDTO = z
  .object({
    name: z.string(),
    collectionName: z.string(),
  })
  .merge(
    z
      .object({
        id: z.null().or(z.number()),
        description: z.string().nullable(),
        fields: z.array(
          z.object({
            id: z.null().or(z.number()),
            isSystem: z.boolean(),
            fieldType: z.string(),
            displayName: z.string(), // 必须是英文
            name: z.string(), // 必须是英文
            description: z.null().or(z.string()),
            defaultValue: z.null().or(z.string()),
            min: z.null().or(z.number()),
            max: z.null().or(z.number()),
            isRequired: z.boolean(),
            isHidden: z.boolean(),
            isOrderField: z.boolean(),
            orderDirection: z.null().or(z.string()),
            enumElementType: z.null().or(z.string()),
            enumElements: z.null().or(z.number()),
            isMultiple: z.boolean(),
            connectResource: z.null().or(z.string()),
            connectField: z.null().or(z.string()),
            connectMany: z.boolean(),
            resourceLinkType: z.null().or(z.string()),
          })
        ),
      })
      .deepPartial()
  )
