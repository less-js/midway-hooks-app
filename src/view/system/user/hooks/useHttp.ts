import { reactive } from 'vue'
import { getAllUsers, editUser, deleteUser } from '@/apis/user'
import { getRsaKey } from '@/apis/user'
import { IUser, IAvatar } from '@/types/user'
import { MessageSuccess, MessageError } from '@/utils/message'
import encrypt from '@/utils/encrypt'
import { filterParams } from '@/utils/common'
import { formLoading, userFormData, visible } from './useForm'
import { tableLoading, users } from './useTable'

const rsa = reactive({ publicKey: '', rsaKey: '' })
const rsaResult = await getRsaKey()
if (rsaResult.status === 1000) {
  rsa.publicKey = rsaResult.data.publicKey
  rsa.rsaKey = rsaResult.data.rsaKey
}

export const findMany = async (): Promise<void> => {
  const { data, status } = await getAllUsers()
  if (status === 1000)
    users.value = data.map((item) => ({
      ...item,
      status: item.status === 1 ? true : false,
      role: item.roles.map((r) => `<p>${r.name}</p>`).join(''),
      department: item.departments.map((r) => `<p>${r.name}</p>`).join(''),
      roles: item.roles.map((r) => ({ id: r.id })),
      departments: item.departments.map((r) => ({ id: r.id })),
    }))
  tableLoading.value = false
}

export const edit = async (data: IUser): Promise<void> => {
  formLoading.value = true

  const avatar =
    data.avatar && (data.avatar as IAvatar[]).length && (data.avatar as IAvatar[])[0].url
      ? (data.avatar as IAvatar[])[0].url
      : null
  data.password = data.password && encrypt(rsa.rsaKey, rsa.publicKey, data.password)
  data.status = data.status ? 1 : 0
  if (!data.roles[0]?.id && !data.departments[0]?.id) {
    data.roles = data.roles.map((item) => ({ id: item }))
    data.departments = data.departments.map((item) => ({ id: item }))
  }

  const { status, message } = await editUser({ ...filterParams(data), avatar })
  if (status === 1000) {
    await findMany()
    visible.value = false
    userFormData.value = {}
    MessageSuccess(data?.id ? '修改成功' : '添加成功')
  } else {
    MessageError(`添加失败: ${message}`)
  }
  formLoading.value = false
}

export const remove = async (id: number): Promise<void> => {
  const { status, message } = await deleteUser(id)
  if (status === 1000) {
    await findMany()
    MessageSuccess('删除成功')
  } else {
    MessageError(`删除失败: ${message}`)
  }
}
