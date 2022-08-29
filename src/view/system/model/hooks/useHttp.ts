import { editModel, deleteModel } from '@/apis/model'
import { useDictionaryStore } from '@/store/dictionaryStore'
import { useModelStore } from '@/store/modelStore'
import { IModel } from '@/types/model'
import { MessageSuccess, MessageError } from '@/utils/message'
import { modelList, modelListLoading, tabActiveIndex } from './useModelList'
import { modelFormLoading, modelFormVisible, modelFormData } from './useModelForm'
import { fieldFormVisible, fieldFormLoading, fieldFormData } from './useFieldForm'
import { fieldTypes, fieldTypeMap, dictionaries } from './useFieldTypes'

const dictionaryStore = useDictionaryStore()
const modelStore = useModelStore()

export const findMany = async (): Promise<void> => {
  const data = await modelStore.getModels
  if (data && data.length) {
    modelList.value = data
    modelListLoading.value = false
  }
}

export const edit = async (model: IModel): Promise<void> => {
  !modelFormLoading.value && (modelFormLoading.value = true)
  !fieldFormLoading.value && (fieldFormLoading.value = true)

  !model.id && delete model.id
  const { status, message } = await editModel(model)
  if (status === 1000) {
    if (!model?.id) tabActiveIndex.value = modelList.value.length.toString()

    modelStore.changeRefresh(true)
    await findMany()

    modelFormVisible.value && (modelFormVisible.value = false)
    fieldFormVisible.value && (fieldFormVisible.value = false)

    setTimeout(() => {
      modelFormData.value.name && (modelFormData.value = {})
      fieldFormData.value.name && (fieldFormData.value = {})
    }, 400)

    MessageSuccess(model?.id ? '修改成功' : '添加成功')
  } else {
    MessageError(`添加失败: ${message}`)
  }

  modelFormLoading.value && (modelFormLoading.value = false)
  fieldFormLoading.value && (fieldFormLoading.value = false)
}

export const remove = async (id: number): Promise<void> => {
  const { status, message } = await deleteModel(id)
  if (status === 1000) {
    modelStore.changeRefresh(true)
    await findMany()

    const index = parseInt(tabActiveIndex.value)
    tabActiveIndex.value = index - 1 > 0 ? (index - 1).toString() : '0'
    MessageSuccess('删除成功')
  } else {
    MessageError(`删除失败: ${message}`)
  }
}

export const findFieldTypes = async (): Promise<void> => {
  try {
    const result = await dictionaryStore.getDictionaries

    if (result && result.length) {
      fieldTypes.value = []
      dictionaries.value = []
      result.forEach((item) => {
        dictionaries.value.push({
          label: item.name,
          value: item.id,
        })
        if (item.aliasName === 'modelFieldTypes') {
          item.enumElements.forEach((item) => {
            fieldTypes.value.push({
              label: item.label,
              value: item.value as string,
              icon: item.remark,
            })
            fieldTypeMap.value[item.value] = { icon: item.remark, label: item.label }
          })
        }
      })
    } else {
      MessageError('字段类型获取失败，请检查枚举字典中是否存在字段类型元素')
    }
  } catch (error) {
    MessageError('字段类型获取失败，请检查枚举字典中是否存在字段类型元素')
  }
}
