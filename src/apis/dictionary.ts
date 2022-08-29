import http from '../utils/http'
import { IDictionary } from '@/types/dictionary'

/**
 * 获取全部字典
 * @returns
 */
export const getAllDictionaries = async () => {
  return await http.get<IDictionary[]>('dictionary/get-all-dictionaries')
}

/**
 * 根据别名获取字典
 * @param aliasName
 * @returns
 */
export const getDictionaryByAliasName = async (aliasName: string) => {
  return await http.post<IDictionary>('dictionary/get-dictionary-by-alias', aliasName)
}

/**
 * 添加 & 编辑字典
 * @param dictionary
 * @returns
 */
export const editDictionary = async (dictionary: IDictionary) => {
  return await http.post<IDictionary>('dictionary/edit', dictionary)
}

/**
 * 删除字典
 * @param id
 * @returns
 */
export const deleteDictionary = async (id: number) => {
  return await http.delete<IDictionary>('dictionary/delete', id)
}
