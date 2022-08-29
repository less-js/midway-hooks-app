import { Prisma, SysRole } from '@prisma/client'
import { prisma } from '../utils/prisma'

class RoleService {
  /**
   * 获取全部角色
   * @returns
   */
  async findMany(): Promise<SysRole[]> {
    try {
      return await prisma.sysRole.findMany()
    } catch (error) {
      if (error) throw error
    }
  }

  /**
   * 添加新角色
   * @param params
   * @returns
   */
  async create(params: SysRole): Promise<SysRole> {
    delete params.id
    try {
      return await prisma.sysRole.create({
        data: {
          ...params,
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          if (error.meta.target === 'sys_roles_name_key') throw '角色名称已存在'
        }
      }
      throw error
    }
  }

  /**
   * 更新角色
   * @param params
   * @returns
   */
  async update(params: SysRole): Promise<SysRole> {
    try {
      return await prisma.sysRole.update({
        where: { id: params.id },
        data: {
          ...params,
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          if (error.meta.target === 'sys_roles_name_key') throw '角色名称已存在'
        }
      }
      if (error) throw error
    }
  }

  /**
   * 删除角色
   * @param id
   * @returns
   */
  async delete(id: number) {
    try {
      return await prisma.sysRole.delete({
        where: { id },
      })
    } catch (error) {
      if (error) throw error
    }
  }

  /**
   * 搜索
   * @param keyword
   * @returns
   */
  async search(keyword: string) {
    try {
      return await prisma.sysRole.findMany({
        where: {
          name: {
            contains: keyword,
          },
        },
      })
    } catch (error) {
      if (error) throw error
    }
  }
}

export default new RoleService()
