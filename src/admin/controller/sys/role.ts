import { Api, Get, Post, Delete, Validate } from '@midwayjs/hooks'
import { z } from 'zod'
import { SysRole } from '@prisma/client'
import { ctx, formatDate } from '../../utils/common'
import RoleService from '../../service/role'
import { RoleDTO } from '../../dto/role'

/**
 * 获取全部角色
 * @param
 * @returns roles
 */
export const getAllRoles = Api(Get('/role/get-all-roles'), async () => {
  try {
    const result = await RoleService.findMany()
    const roles = result.map((item) => {
      return {
        ...item,
        createdAt: formatDate(item.createdAt, true),
        updatedAt: formatDate(item.updatedAt, true),
      }
    })
    if (roles) ctx().ok([...roles])
  } catch (error) {
    ctx().fail('角色生成失败')
  }
})

/**
 * 添加 & 更新角色
 * @param role
 * @returns
 */
export const editRole = Api(Post('/role/edit'), Validate(RoleDTO), async (role: SysRole) => {
  try {
    const result = !role.id ? await RoleService.create(role) : await RoleService.update(role)

    if (result) ctx().ok({ ...result })
  } catch (error) {
    ctx().fail(error)
  }
})

/**
 * 删除角色
 * @param id
 * @returns
 */
export const deleteRole = Api(Delete('/role/delete'), Validate(z.number()), async (id: number) => {
  try {
    const result = await RoleService.delete(id)

    if (result) ctx().ok(result)
  } catch (error) {
    ctx().fail(error)
  }
})

/**
 * 搜索角色
 * @param keyword
 * @returns
 */
export const searchRole = Api(
  Post('/role/search'),
  Validate(z.string()),
  async (keyword: string) => {
    try {
      const result = await RoleService.search(keyword)

      if (result) ctx().ok(result)
    } catch (error) {
      ctx().fail(error)
    }
  }
)
