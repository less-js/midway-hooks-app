import { Prisma } from '@prisma/client'

export const sysDepartmentData: Prisma.SysDepartmentCreateInput[] = [
  {
    name: '总部',
  },
  {
    name: '编辑部',
  },
  {
    name: '测试部',
  },
]