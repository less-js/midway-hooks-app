import { Prisma } from '@prisma/client'
import { SysMenu, SysRole, SysDepartment } from '@prisma/client'
import { prisma } from '../utils/prisma'
import { findChildIds } from '../utils/common'

export interface IMenu extends SysMenu {
  roles: SysRole[]
  departments: SysDepartment[]
}

class MenuService {
  constructor() {
    this.getAllMenus = this.getAllMenus.bind(this)
  }

  /**
   * 根据角色IDs & 部门IDs 获取菜单
   * @param roleId
   * @param departmentId
   * @returns
   */
  async getPermissionMenus(roleIds: number[], departmentIds: number[]): Promise<SysMenu[]> {
    if (!roleIds || !departmentIds) return
    try {
      return await prisma.sysMenu.findMany({
        where: {
          roles: {
            some: {
              id: {
                in: roleIds,
              },
            },
          },
          departments: {
            some: {
              id: {
                in: departmentIds,
              },
            },
          },
        },
      })
    } catch (error) {
      if (error) throw error
    }
  }

  /**
   * 获取全部菜单
   * @returns
   */
  async getAllMenus(): Promise<SysMenu[]> {
    try {
      return await prisma.sysMenu.findMany({
        include: {
          roles: true,
          departments: true,
        },
      })
    } catch (error) {
      if (error) throw error
    }
  }

  /**
   * 添加新菜单
   * @param menu
   * @returns
   */
  async addMenu(menu: IMenu): Promise<IMenu> {
    try {
      return await prisma.sysMenu.create({
        data: {
          ...menu,
          roles: {
            connect: menu.roles,
          },
          departments: {
            connect: menu.departments,
          },
        },
        include: {
          departments: true,
          roles: true,
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          switch (error.meta.target) {
            case 'sys_menus_name_key':
              throw '菜单名称已存在'
              break
            case 'sys_menus_routeName_key':
              throw '路由名称已存在'
              break
            case 'sys_menus_routePath_key':
              throw '路由路径已存在'
              break
            default:
              break
          }
        }
      }
      throw error
    }
  }

  /**
   * 更新菜单
   * @param menu
   * @returns
   */
  async updateMenu(menu: IMenu): Promise<IMenu> {
    try {
      return await prisma.sysMenu.update({
        where: { id: menu.id },
        data: {
          ...menu,
          roles: {
            set: [],
            connect: menu.roles,
          },
          departments: {
            set: [],
            connect: menu.departments,
          },
        },
        include: {
          departments: true,
          roles: true,
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          switch (error.meta.target) {
            case 'sys_menus_name_key':
              throw '菜单名称已存在'
              break
            case 'sys_menus_routeName_key':
              throw '路由名称已存在'
              break
            case 'sys_menus_routePath_key':
              throw '路由路径已存在'
              break
            default:
              break
          }
        }
      }
      if (error) throw error
    }
  }

  /**
   * 删除菜单
   * @param id
   * @returns
   */
  async deleteMenu(id: number) {
    try {
      const menus = await this.getAllMenus()
      const menuIds = findChildIds(menus, id)
      const ids = [...menuIds, id]
      const result: Array<SysMenu> = []
      for (let i = 0; i < ids.length; i++) {
        const res = await prisma.sysMenu.delete({ where: { id: ids[i] } })
        result.push(res)
      }
      return result
    } catch (error) {
      if (error) throw error
    }
  }

  /**
   * 搜索
   * @param keyword
   * @returns
   */
  async searchMenu(keyword: string) {
    try {
      return await prisma.sysMenu.findMany({
        where: {
          name: {
            contains: keyword,
          },
        },
        include: {
          departments: true,
          roles: true,
        },
      })
    } catch (error) {
      if (error) throw error
    }
  }
}

export default new MenuService()
