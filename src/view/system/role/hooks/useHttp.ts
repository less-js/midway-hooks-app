import { editRole, deleteRole } from '@/apis/role'
import { useRoleStore } from '@/store/roleStore'
import { IRole } from '@/types/role'
import { MessageSuccess, MessageError } from '@/utils/message'
import { formLoading, formData, visible } from './useForm'
import { tableLoading, roles } from './useTable'

const roleStore = useRoleStore()

export const findMany = async (): Promise<void> => {
  const data = await roleStore.getRoles
  if (data && data.length) {
    roles.value = data
    tableLoading.value = false
  }
}

export const edit = async (data: IRole): Promise<void> => {
  formLoading.value = true

  const { status, message } = await editRole({ ...data })
  if (status === 1000) {
    roleStore.changeRefresh(true)
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
  const { status, message } = await deleteRole(id)
  if (status === 1000) {
    roleStore.changeRefresh(true)
    await findMany()
    MessageSuccess('删除成功')
  } else {
    MessageError(`删除失败: ${message}`)
  }
}
