import { useDepartmentStore } from '@/store/departmentStore'
import { useRoleStore } from '@/store/roleStore'
import { MessageError } from '@/utils/message'
import { IOptions } from '@/types/form'

const departmentStore = useDepartmentStore()
const roleStore = useRoleStore()

// 获取全部角色
export const useFetchRoles = async (): Promise<IOptions[]> => {
  try {
    const result = await roleStore.getRoles
    if (result && result.length) {
      return result.map((item) => ({ label: item.name, value: item.id }))
    } else {
      MessageError('角色列表获取失败')
    }
  } catch (error) {
    MessageError('角色列表获取失败')
  }
}

// 获取全部部门
export const useFetchDepartments = async (): Promise<IOptions[]> => {
  try {
    const result = await departmentStore.getDepartments
    if (result && result.length) {
      return result.map((item) => ({ label: item.name, value: item.id }))
    } else {
      MessageError('部门列表获取失败')
    }
  } catch (error) {
    MessageError('部门列表获取失败')
  }
}
