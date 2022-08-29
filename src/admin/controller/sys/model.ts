import { Api, Get, Post, Delete, Validate } from '@midwayjs/hooks'
import { z } from 'zod'
import { SysModel } from '@prisma/client'
import { ctx } from '../../utils/common'
import ModelService from '../../service/model'

/**
 * 获取全部模型
 * @param
 * @returns models
 */
export const getAllModels = Api(Get('/model/get-all-models'), async () => {
  try {
    const result = await ModelService.findMany()
    if (result) ctx().ok([...result])
  } catch (error) {
    ctx().fail('模型生成失败')
  }
})

/**
 * 添加 & 更新模型
 * @param model
 * @returns
 */
export const editModel = Api(
  Post('/model/edit'),
  /* Validate(RoleDTO), */
  async (model: SysModel) => {
    try {
      const result = !model.id ? await ModelService.create(model) : await ModelService.update(model)

      if (result) ctx().ok({ ...result })
    } catch (error) {
      ctx().fail(error)
    }
  }
)

/**
 * 删除模型
 * @param id
 * @returns
 */
export const deleteModel = Api(
  Delete('/model/delete'),
  Validate(z.number()),
  async (id: number) => {
    try {
      const result = await ModelService.delete(id)

      if (result) ctx().ok(result)
    } catch (error) {
      ctx().fail(error)
    }
  }
)

/**
 * 搜索模型
 * @param keyword
 * @returns
 */
export const searchModel = Api(
  Post('/model/search'),
  Validate(z.string()),
  async (keyword: string) => {
    try {
      const result = await ModelService.search(keyword)

      if (result) ctx().ok(result)
    } catch (error) {
      ctx().fail(error)
    }
  }
)
