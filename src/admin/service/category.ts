import { Prisma, SysCategories } from '@prisma/client'
import { prisma } from '../utils/prisma'

class CategoryService {
  /**
   * 获取全部栏目分类
   * @returns
   */
  async findMany(): Promise<SysCategories[]> {
    try {
      return await prisma.sysCategories.findMany()
    } catch (error) {
      if (error) throw error
    }
  }

  /**
   * 添加新栏目分类
   * @param params
   * @returns
   */
  async create(params: SysCategories): Promise<SysCategories> {
    try {
      return await prisma.sysCategories.create({
        data: {
          ...params,
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          if (error.meta.target === 'sys_category_name_key') throw '栏目分类名称已存在'
        }
      }
      throw error
    }
  }

  /**
   * 更新栏目分类
   * @param params
   * @returns
   */
  async update(params: SysCategories): Promise<SysCategories> {
    try {
      return await prisma.sysCategories.update({
        where: { id: params.id },
        data: {
          ...params,
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          if (error.meta.target === 'sys_models_name_key') throw '栏目分类名称已存在'
          if (error.meta.target === 'sys_models_collectionName_key') throw '栏目分类数据表已存在'
        }
      }
      if (error) throw error
    }
  }

  /**
   * 删除栏目分类
   * @param id
   * @returns
   */
  async delete(id: number) {
    try {
      return await prisma.sysCategories.delete({
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
      return await prisma.sysCategories.findMany({
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

export default new CategoryService()
