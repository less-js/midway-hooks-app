import { editDictionary, deleteDictionary } from '@/apis/dictionary'
import { IDictionary } from '@/types/dictionary'
import { MessageSuccess, MessageError } from '@/utils/message'
import { useDictionaryStore } from '@/store/dictionaryStore'
import { formLoading, formData, visible } from './useForm'
import { tableLoading, dictionaries } from './useTable'

const dictionaryStore = useDictionaryStore()

export const findMany = async (): Promise<void> => {
  const data = await dictionaryStore.getDictionaries
  if (data && data.length)
    dictionaries.value = data.map((item) => ({
      ...item,
      statusText: item.status
        ? `<font color="#409EFF">启用</font>`
        : `<font color="#F56C6C">禁用</font>`,
      enumElementTypeText: item.enumElementType !== 'number' ? '字符串' : '数字',
    }))
  tableLoading.value = false
}

export const edit = async (data: IDictionary): Promise<void> => {
  formLoading.value = true

  const { status, message } = await editDictionary({ ...data })
  if (status === 1000) {
    dictionaryStore.changeRefresh(true)
    await findMany()
    visible.value = false
    formData.value = {
      name: '',
      aliasName: '',
      remark: '',
      status: true,
      enumElementType: 'string',
      enumElements: [{ label: null, value: null, isEnable: true, remark: null }],
    }
    MessageSuccess(data?.id ? '修改成功' : '添加成功')
  } else {
    MessageError(`添加失败: ${message}`)
  }
  formLoading.value = false
}

export const remove = async (id: number): Promise<void> => {
  const { status, message } = await deleteDictionary(id)
  if (status === 1000) {
    dictionaryStore.changeRefresh(true)
    await findMany()
    MessageSuccess('删除成功')
  } else {
    MessageError(`删除失败: ${message}`)
  }
}
