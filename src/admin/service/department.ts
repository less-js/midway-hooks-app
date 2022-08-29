import { Prisma } from '@prisma/client'
import { SysDepartment } from '@prisma/client'
import { prisma } from '../utils/prisma'
import { findChildIds } from '../utils/common'

class DepartmentService {
  constructor() {
    this.findMany = this.findMany.bind(this)
  }

  /**
   * 获取全部部门
   * @returns
   */
  async findMany(): Promise<SysDepartment[]> {
    try {
      return await prisma.sysDepartment.findMany()
    } catch (error) {
      if (error) throw error
    }
  }

  /**
   * 添加新部门
   * @param params
   * @returns
   */
  async create(params: SysDepartment): Promise<SysDepartment> {
    delete params.id
    try {
      return await prisma.sysDepartment.create({
        data: {
          ...params,
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          if (error.meta.target === 'sys_departments_name_key') throw '部门名称已存在'
        }
      }
      throw error
    }
  }

  /**
   * 更新部门
   * @param params
   * @returns
   */
  async update(params: SysDepartment): Promise<SysDepartment> {
    try {
      return await prisma.sysDepartment.update({
        where: { id: params.id },
        data: {
          ...params,
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          if (error.meta.target === 'sys_departments_name_key') throw '部门名称已存在'
        }
      }
      if (error) throw error
    }
  }

  /**
   * 删除部门,如果有子部门则一并删除
   * @param id
   * @returns
   */
  async delete(id) {
    try {
      const departments = await this.findMany()
      const departmentIds = findChildIds(departments, id)
      const ids = [...departmentIds, id]
      const result: Array<SysDepartment> = []
      for (let i = 0; i < ids.length; i++) {
        const res = await prisma.sysDepartment.delete({ where: { id: ids[i] } })
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
  async search(keyword: string) {
    try {
      return await prisma.sysDepartment.findMany({
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

export default new DepartmentService()
