import http from '../utils/http'
import { ICategory } from '@/types/category'

/**
 * 获取全部模型
 * @returns
 */
export const getAllCategories = async () => {
  return await http.get<ICategory[]>('category/get-all-categories')
}

/**
 * 添加 & 编辑模型
 * @param category
 * @returns
 */
export const editCategory = async (category: ICategory) => {
  return await http.post<ICategory>('category/edit', category)
}

/**
 * 删除模型
 * @param id
 * @returns
 */
export const deleteCategory = async (id: number) => {
  return await http.delete<ICategory>('category/delete', id)
}
