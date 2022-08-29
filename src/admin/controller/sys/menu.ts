import { Api, Get, Post, Delete, Validate } from '@midwayjs/hooks'
import { z } from 'zod'
import { ctx } from '../../utils/common'
import MenuService, { IMenu } from '../../service/menu'
import UserService from '../../service/user'
import { MenuDTO } from '../../dto/menu'

/**
 * 根据角色IDs & 部门IDs 获取菜单
 * @param
 * @returns menus
 */
export const getPermissionMenus = Api(Get('/menu/get-permission-menus'), async () => {
  const tokenResult = await UserService.decodeToken()
  if (!tokenResult) {
    ctx().fail('获取角色权限失败.')
  } else {
    const { roleIds, departmentIds } = tokenResult
    try {
      const menus = await MenuService.getPermissionMenus(roleIds, departmentIds)
      if (menus) ctx().ok([...menus])
    } catch (error) {
      ctx().fail('菜单生成错误')
    }
  }
})

/**
 * 获取全部菜单
 * @param
 * @returns menus
 */
export const getAllMenus = Api(Get('/menu/get-all-menus'), async () => {
  try {
    const menus = await MenuService.getAllMenus()
    if (menus) ctx().ok([...menus])
  } catch (error) {
    ctx().fail('菜单生成失败')
  }
})

/**
 * 添加 & 更新菜单
 * @param menu
 * @returns
 */
export const editMenu = Api(Post('/menu/edit'), Validate(MenuDTO), async (menu: IMenu) => {
  try {
    const result = !menu.id ? await MenuService.addMenu(menu) : await MenuService.updateMenu(menu)

    if (result) ctx().ok({ ...result })
  } catch (error) {
    ctx().fail(error)
  }
})

/**
 * 删除菜单
 * @param id
 * @returns
 */
export const deleteMenu = Api(Delete('/menu/delete'), Validate(z.number()), async (id: number) => {
  try {
    const result = await MenuService.deleteMenu(id)
    if (result) ctx().ok(result)
  } catch (error) {
    ctx().fail(error)
  }
})

/**
 * 搜索菜单
 * @param keyword
 * @returns
 */
export const searchMenu = Api(
  Post('/menu/search'),
  Validate(z.string()),
  async (keyword: string) => {
    try {
      const result = await MenuService.searchMenu(keyword)

      if (result) ctx().ok(result)
    } catch (error) {
      ctx().fail(error)
    }
  }
)
