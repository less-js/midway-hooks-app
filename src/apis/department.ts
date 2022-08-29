import http from '../utils/http'
import { IDepartment } from '@/types/department'

/**
 * 获取全部部门
 * @returns
 */
export const getAllDepartments = async () => {
  return await http.get<IDepartment[]>('department/get-all-departments')
}

/**
 * 添加 & 编辑部门
 * @param department
 * @returns
 */
export const editDepartment = async (department: IDepartment) => {
  return await http.post<IDepartment>('department/edit', department)
}

/**
 * 删除部门
 * @param id
 * @returns
 */
export const deleteDepartment = async (id: number) => {
  return await http.delete<IDepartment[]>('department/delete', id)
}

/**
 * 搜索部门
 * @param keyword
 * @returns
 */
export const searchDepartment = async (keyword: string) => {
  return await http.post<IDepartment[]>('department/search', keyword)
}
