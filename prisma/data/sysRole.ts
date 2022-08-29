import { Prisma } from '@prisma/client'

export const sysRoleData: Prisma.SysRoleCreateInput[] = [
  {
    name: '超级管理员',
  },
  {
    name: '编辑',
  },
  {
    name: '测试',
  },
]
