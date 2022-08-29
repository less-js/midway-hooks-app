import { Api, Get, Post, Delete, Validate } from '@midwayjs/hooks'
import { z } from 'zod'
import { SysCategories } from '@prisma/client'
import { ctx } from '../../utils/common'
import CategoryService from '../../service/category'

/**
 * 获取全部栏目分类
 * @param
 * @returns categories
 */
export const getAllCategories = Api(Get('/category/get-all-categories'), async () => {
  try {
    const result = await CategoryService.findMany()
    if (result) ctx().ok([...result])
  } catch (error) {
    ctx().fail('栏目分类生成失败')
  }
})

/**
 * 添加 & 更新栏目分类
 * @param category
 * @returns
 */
export const editCategory = Api(
  Post('/category/edit'),
  /* Validate(RoleDTO), */
  async (category: SysCategories) => {
    try {
      const result = !category.id
        ? await CategoryService.create(category)
        : await CategoryService.update(category)

      if (result) ctx().ok({ ...result })
    } catch (error) {
      ctx().fail(error)
    }
  }
)

/**
 * 删除栏目分类
 * @param id
 * @returns
 */
export const deleteCategory = Api(
  Delete('/category/delete'),
  Validate(z.number()),
  async (id: number) => {
    try {
      const result = await CategoryService.delete(id)

      if (result) ctx().ok(result)
    } catch (error) {
      ctx().fail(error)
    }
  }
)

/**
 * 搜索栏目分类
 * @param keyword
 * @returns
 */
export const searchCategory = Api(
  Post('/category/search'),
  Validate(z.string()),
  async (keyword: string) => {
    try {
      const result = await CategoryService.search(keyword)

      if (result) ctx().ok(result)
    } catch (error) {
      ctx().fail(error)
    }
  }
)
