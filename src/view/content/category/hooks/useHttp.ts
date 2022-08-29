import { getAllCategories, editCategory, deleteCategory } from '@/apis/category'
import { useModelStore } from '@/store/modelStore'
import { ICategory } from '@/types/category'
import { MessageSuccess, MessageError } from '@/utils/message'
import { formLoading, formData, models, visible } from './useForm'
import { tableLoading, categories } from './useTable'

const modelStore = useModelStore()

export const findMany = async (): Promise<void> => {
  const { data, status } = await getAllCategories()
  if (status === 1000) {
    categories.value = data
    tableLoading.value = false
  }
}

export const edit = async (data: ICategory): Promise<void> => {
  formLoading.value = true

  const { status, message } = await editCategory({ ...data })
  if (status === 1000) {
    await findMany()
    visible.value = false
    formData.value = {}
    MessageSuccess(data?.id ? '修改成功' : '添加成功')
  } else {
    MessageError(`添加失败: ${message}`)
  }
  formLoading.value = false
}

export const remove = async (id: number): Promise<void> => {
  const { status, message } = await deleteCategory(id)
  if (status === 1000) {
    await findMany()
    MessageSuccess('删除成功')
  } else {
    MessageError(`删除失败: ${message}`)
  }
}

export const fetchModels = async (): Promise<void> => {
  try {
    const result = await modelStore.getModels
    if (result && result.length) {
      models.value = result.map((item) => ({ label: item.name, value: item.id }))
    } else {
      MessageError('模型列表获取失败')
    }
  } catch (error) {
    MessageError('模型列表获取失败')
  }
}
