import { Prisma, SysDictionaries } from '@prisma/client'
import { prisma } from '../utils/prisma'

class DictionariesService {
  /**
   * 获取全部字典
   * @returns
   */
  async findMany(): Promise<SysDictionaries[]> {
    try {
      return await prisma.sysDictionaries.findMany()
    } catch (error) {
      if (error) throw error
    }
  }

  /**
   * 根据 alias 获取字典
   * @returns
   */
  async findByAlias(aliasName: string): Promise<SysDictionaries> {
    try {
      return await prisma.sysDictionaries.findUnique({
        where: {
          aliasName,
        },
      })
    } catch (error) {
      if (error) throw error
    }
  }

  /**
   * 添加新字典
   * @param params
   * @returns
   */
  async create(params: SysDictionaries): Promise<SysDictionaries> {
    try {
      return await prisma.sysDictionaries.create({
        data: {
          ...params,
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          if (error.meta.target === 'sys_dictionaries_name_key') throw '字典名称已存在'
          if (error.meta.target === 'sys_dictionaries_alias_key') throw '别名已存在'
        }
      }
      throw error
    }
  }

  /**
   * 更新字典
   * @param params
   * @returns
   */
  async update(params: SysDictionaries): Promise<SysDictionaries> {
    delete params.createdAt
    delete params.updatedAt
    try {
      return await prisma.sysDictionaries.update({
        where: { id: params.id },
        data: {
          ...params,
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          if (error.meta.target === 'sys_dictionaries_name_key') throw '字典名称已存在'
          if (error.meta.target === 'sys_dictionaries_alias_key') throw '别名已存在'
        }
      }
      if (error) throw error
    }
  }

  /**
   * 删除字典
   * @param id
   * @returns
   */
  async delete(id: number) {
    try {
      return await prisma.sysDictionaries.delete({
        where: { id },
      })
    } catch (error) {
      if (error) throw error
    }
  }
}

export default new DictionariesService()
