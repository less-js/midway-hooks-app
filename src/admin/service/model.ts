import { Prisma, SysModel } from '@prisma/client'
import { prisma } from '../utils/prisma'

class ModelService {
  /**
   * 获取全部模型
   * @returns
   */
  async findMany(): Promise<SysModel[]> {
    try {
      return await prisma.sysModel.findMany()
    } catch (error) {
      if (error) throw error
    }
  }

  /**
   * 添加新模型
   * @param params
   * @returns
   */
  async create(params: SysModel): Promise<SysModel> {
    try {
      return await prisma.sysModel.create({
        data: {
          ...params,
          fields: !params.fields
            ? [
                {
                  id: 'id',
                  name: 'id',
                  displayName: '文档 ID',
                  description: '系统字段，请勿随意修改',
                  isHidden: true,
                  isSystem: true,
                  type: 'Number',
                },
                {
                  id: 'createdAt',
                  name: 'createdAt',
                  displayName: '创建时间',
                  description: '系统字段，请勿随意修改。通过系统录入的数据会默认添加该字段',
                  isSystem: true,
                  type: 'DateTime',
                },
                {
                  id: 'updatedAt',
                  displayName: '修改时间',
                  description: '系统字段，请勿随意修改。通过系统录入的数据会默认添加该字段',
                  name: 'updatedAt',
                  isSystem: true,
                  type: 'DateTime',
                },
              ]
            : params.fields,
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          if (error.meta.target === 'sys_models_name_key') throw '模型名称已存在'
          if (error.meta.target === 'sys_models_collectionName_key') throw '模型数据表已存在'
        }
      }
      throw error
    }
  }

  /**
   * 更新模型
   * @param params
   * @returns
   */
  async update(params: SysModel): Promise<SysModel> {
    try {
      return await prisma.sysModel.update({
        where: { id: params.id },
        data: {
          ...params,
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          if (error.meta.target === 'sys_models_name_key') throw '模型名称已存在'
          if (error.meta.target === 'sys_models_collectionName_key') throw '模型数据表已存在'
        }
      }
      if (error) throw error
    }
  }

  /**
   * 删除模型
   * @param id
   * @returns
   */
  async delete(id: number) {
    try {
      return await prisma.sysModel.delete({
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
      return await prisma.sysModel.findMany({
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

export default new ModelService()
