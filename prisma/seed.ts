import { PrismaClient } from '@prisma/client'
import { sysUserData } from './data/sysUser'
import { sysRoleData } from './data/sysRole'
import { sysDepartmentData } from './data/sysDepartment'
import { sysMenuData, sysMenuItem } from './data/sysMenu'
import { sysModelData } from './data/sysModel'
import { sysDictionariesData } from './data/sysDictionaries'
const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < sysRoleData.length; i++) {
    const item = sysRoleData[i]
    await prisma.sysRole.upsert({
      where: { name: item.name },
      update: { name: item.name },
      create: { name: item.name },
    })
  }
  for (let i = 0; i < sysDepartmentData.length; i++) {
    const item = sysDepartmentData[i]
    await prisma.sysDepartment.upsert({
      where: { name: item.name },
      update: { name: item.name },
      create: { name: item.name },
    })
  }
  for (let i = 0; i < sysUserData.length; i++) {
    const item = sysUserData[i]
    let roleConnect,
      depContent: { id: number }[] = []
    // 管理员 & 总部
    if (i === 0) {
      roleConnect = [{ id: 1 }]
      depContent = [{ id: 1 }]
    }
    // 编辑角色 & 编辑部门
    if (i === 1) {
      roleConnect = [{ id: 2 }]
      depContent = [{ id: 2 }]
    }
    // 测试角色 & 测试部门
    if (i === 2) {
      roleConnect = [{ id: 3 }]
      depContent = [{ id: 3 }]
    }

    await prisma.sysUser.upsert({
      where: { username: item.username },
      update: {
        username: item.username,
        password: item.password,
        roles: {
          set: [],
          connect: [...roleConnect],
        },
        departments: {
          set: [],
          connect: [...depContent],
        },
      },
      create: {
        username: item.username,
        password: item.password,
        roles: {
          connect: [...roleConnect],
        },
        departments: {
          connect: [...depContent],
        },
      },
    })
  }
  for (let i = 0; i < sysMenuData.length; i++) {
    const item = sysMenuData[i]
    let roleConnect,
      depContent: { id: number }[] = []

    // 3 种权限都有的菜单
    if (i === 0 || i === 11 || i === 12) {
      roleConnect = [{ id: 1 }, { id: 2 }, { id: 3 }]
      depContent = [{ id: 1 }, { id: 2 }, { id: 3 }]
    }
    // 角色 & 部门为编辑的菜单
    if (i <= 10 && i > 0) {
      roleConnect = [{ id: 2 }]
      depContent = [{ id: 2 }]
    }
    // 角色 & 部门为测试的菜单
    // if (i >= 10) {
    //   roleConnect = [{ id: 3 }]
    //   depContent = [{ id: 3 }]
    // }

    await prisma.sysMenu.upsert({
      where: { id: i + 1 },
      update: {
        ...sysMenuItem(item),
        roles: {
          set: [],
          connect: [{ id: 1 }, ...roleConnect],
        },
        departments: {
          set: [],
          connect: [{ id: 1 }, ...depContent],
        },
      },
      create: {
        ...sysMenuItem(item),
        roles: {
          connect: [{ id: 1 }, ...roleConnect],
        },
        departments: {
          connect: [{ id: 1 }, ...depContent],
        },
      },
    })
  }
  for (let i = 0; i < sysModelData.length; i++) {
    const item = sysModelData[i]
    await prisma.sysModel.upsert({
      where: { name: item.name },
      update: { ...item },
      create: { ...item },
    })
  }
  for (let i = 0; i < sysDictionariesData.length; i++) {
    const item = sysDictionariesData[i]
    await prisma.sysDictionaries.upsert({
      where: { name: item.name },
      update: { ...item },
      create: { ...item },
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
