import http from '../utils/http'
import { IModel } from '@/types/model'

/**
 * 获取全部模型
 * @returns
 */
export const getAllModels = async () => {
  return await http.get<IModel[]>('model/get-all-models')
}

/**
 * 添加 & 编辑模型
 * @param model
 * @returns
 */
export const editModel = async (model: IModel) => {
  return await http.post<IModel>('model/edit', model)
}

/**
 * 删除模型
 * @param id
 * @returns
 */
export const deleteModel = async (id: number) => {
  return await http.delete<IModel>('model/delete', id)
}
