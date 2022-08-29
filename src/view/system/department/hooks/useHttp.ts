import { editDepartment, deleteDepartment } from '@/apis/department'
import { useDepartmentStore } from '@/store/departmentStore'
import { array2Tree, orderBy, list2Tree } from '@/utils/common'
import { MessageSuccess, MessageError } from '@/utils/message'
import { IDepartment } from '@/types/department'
import { formData, visible } from './useForm'
import { tableLoading, departments } from './useTable'
import { formLoading, departmentOptions } from './useForm'

const departmentStore = useDepartmentStore()

export const findMany = async (): Promise<void> => {
  const data = await departmentStore.getDepartments
  let tree = []
  const options = []
  if (data && data.length) {
    tree = array2Tree({ data: orderBy(data) }, (item) => {
      options.push({
        label: item.name,
        value: item.id,
        id: item.id,
        parentId: item.parentId,
      })
    })
  }
  departments.value = tree
  departmentOptions.value = list2Tree(options)
  tableLoading.value = false
}

export const edit = async (data: IDepartment): Promise<void> => {
  formLoading.value = true

  const { status, message } = await editDepartment({
    ...data,
    parentId: data.parentId ? data.parentId : 0,
  })
  if (status === 1000) {
    departmentStore.changeRefresh(true)
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
  const { status, message } = await deleteDepartment(id)
  if (status === 1000) {
    departmentStore.changeRefresh(true)
    await findMany()
    MessageSuccess('删除成功')
  } else {
    MessageError(`删除失败: ${message}`)
  }
}
