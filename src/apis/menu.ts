import http from '../utils/http'
import { IMenu } from '@/types/menu'

/**
 * 根据角色IDs & 部门IDs 获取菜单
 * @returns
 */
export const getPermissionMenus = async () => {
  return await http.get<IMenu[]>('menu/get-permission-menus')
}

/**
 * 获取全部菜单
 * @returns
 */
export const getAllMenus = async () => {
  return await http.get<IMenu[]>('menu/get-all-menus')
}

/**
 * 添加 & 编辑菜单
 * @param menu
 * @returns
 */
export const editMenu = async (menu: IMenu) => {
  return await http.post<IMenu>('menu/edit', menu)
}

/**
 * 删除菜单
 * @param id
 * @returns
 */
export const deleteMenu = async (id: number) => {
  return await http.delete<IMenu[]>('menu/delete', id)
}

/**
 * 搜索菜单
 * @param keyword
 * @returns
 */
export const searchMenu = async (keyword: string) => {
  return await http.post<IMenu[]>('menu/search', keyword)
}
