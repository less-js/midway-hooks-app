import { Api, Get, Post, Delete, Validate } from '@midwayjs/hooks'
import { z } from 'zod'
import { SysDepartment } from '@prisma/client'
import { ctx, formatDate } from '../../utils/common'
import DepartmentService from '../../service/department'
import { DepartmentDTO } from '../../dto/department'

/**
 * 获取全部部门
 * @param
 * @returns departments
 */
export const getAllDepartments = Api(Get('/department/get-all-departments'), async () => {
  try {
    const result = await DepartmentService.findMany()
    const departments = result.map((item) => {
      return {
        ...item,
        createdAt: formatDate(item.createdAt, true),
        updatedAt: formatDate(item.updatedAt, true),
      }
    })
    if (departments) ctx().ok([...departments])
  } catch (error) {
    ctx().fail('部门生成失败')
  }
})

/**
 * 添加 & 更新部门
 * @param params
 * @returns
 */
export const editDepartment = Api(
  Post('/department/edit'),
  Validate(DepartmentDTO),
  async (params: SysDepartment) => {
    try {
      const result = !params.id
        ? await DepartmentService.create(params)
        : await DepartmentService.update(params)

      if (result) ctx().ok({ ...result })
    } catch (error) {
      ctx().fail(error)
    }
  }
)

/**
 * 删除部门
 * @param id
 * @returns
 */
export const deleteRole = Api(
  Delete('/department/delete'),
  Validate(z.number()),
  async (id: number) => {
    try {
      const result = await DepartmentService.delete(id)
      if (result) ctx().ok(result)
    } catch (error) {
      ctx().fail(error)
    }
  }
)

/**
 * 搜索部门
 * @param keyword
 * @returns
 */
export const searchDepartment = Api(
  Post('/department/search'),
  Validate(z.string()),
  async (keyword: string) => {
    try {
      const result = await DepartmentService.search(keyword)

      if (result) ctx().ok(result)
    } catch (error) {
      ctx().fail(error)
    }
  }
)
