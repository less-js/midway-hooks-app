import { Api, Get, Post, Delete, Validate } from '@midwayjs/hooks'
import { z } from 'zod'
import { SysDictionaries } from '@prisma/client'
import { ctx, formatDate } from '../../utils/common'
import Dictionary from '../../service/dictionary'
import { DictionaryDTO } from '../../dto/dictionary'

/**
 * 获取全部字典
 * @param
 * @returns dictionaries
 */
export const getAllDictionaries = Api(Get('/dictionary/get-all-dictionaries'), async () => {
  try {
    const result = await Dictionary.findMany()
    const dictionaries = result.map((item) => {
      return {
        ...item,
        createdAt: formatDate(item.createdAt, true),
        updatedAt: formatDate(item.updatedAt, true),
      }
    })
    if (dictionaries) ctx().ok([...dictionaries])
  } catch (error) {
    ctx().fail('字典生成失败')
  }
})

/**
 * 根据 alias 获取字典
 * @param alias
 * @returns dictionaries
 */
export const findByAlias = Api(
  Post('/dictionary/get-dictionary-by-alias'),
  async (aliasName: string) => {
    try {
      const result = await Dictionary.findByAlias(aliasName)
      if (result) ctx().ok(result)
    } catch (error) {
      ctx().fail('字典获取失败')
    }
  }
)

/**
 * 添加 & 更新字典
 * @param dictionary
 * @returns
 */
export const editDictionary = Api(
  Post('/dictionary/edit'),
  Validate(DictionaryDTO),
  async (dictionary: SysDictionaries) => {
    try {
      const result = !dictionary.id
        ? await Dictionary.create(dictionary)
        : await Dictionary.update(dictionary)

      if (result) ctx().ok({ ...result })
    } catch (error) {
      ctx().fail(error)
    }
  }
)

/**
 * 删除字典
 * @param id
 * @returns
 */
export const deleteDictionary = Api(
  Delete('/dictionary/delete'),
  Validate(z.number()),
  async (id: number) => {
    try {
      const result = await Dictionary.delete(id)

      if (result) ctx().ok(result)
    } catch (error) {
      ctx().fail(error)
    }
  }
)
