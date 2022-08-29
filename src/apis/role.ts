import http from '../utils/http'
import { IRole } from '@/types/role'

/**
 * 获取全部角色
 * @returns
 */
export const getAllRoles = async () => {
  return await http.get<IRole[]>('role/get-all-roles')
}

/**
 * 添加 & 编辑角色
 * @param role
 * @returns
 */
export const editRole = async (role: IRole) => {
  return await http.post<IRole>('role/edit', role)
}

/**
 * 删除角色
 * @param id
 * @returns
 */
export const deleteRole = async (id: number) => {
  return await http.delete<IRole>('role/delete', id)
}

/**
 * 搜索角色
 * @param keyword
 * @returns
 */
export const searchRole = async (keyword: string) => {
  return await http.post<IRole[]>('role/search', keyword)
}
