import { getAllMenus, editMenu, deleteMenu, searchMenu } from '@/apis/menu'
import { useMenuStore } from '@/store/menuStore'
import { useNavTabsStore } from '@/store/navTabsStore'
import { array2Tree, orderBy, list2Tree } from '@/utils/common'
import { MessageSuccess, MessageError } from '@/utils/message'
import { IMenu } from '@/types/menu'
import { formLoading, formData, visible, parentMenus } from './useForm'
import { menus, tableLoading } from './useTable'

const navTabsStore = useNavTabsStore()

export const findMany = async (): Promise<void> => {
  const { data, status } = await getAllMenus()
  let tree: IMenu[] = []
  const temp = []
  if (status === 1000) {
    tree = array2Tree({ data: orderBy(data) }, (item) => {
      item.role = item.roles.map((r) => `<p>${r.name} - ${r.id}</p>`).join('')
      item.department = item.departments.map((r) => `<p>${r.name} - ${r.id}</p>`).join('')
      item.roles = item.roles.map((r) => ({ id: r.id }))
      item.departments = item.departments.map((r) => ({ id: r.id }))

      temp.push({
        label: item.name,
        value: item.id,
        id: item.id,
        parentId: item.parentId,
      })
    })
  }
  menus.value = tree
  parentMenus.value = list2Tree(temp)
  tableLoading.value = false
}

export const edit = async (data: IMenu): Promise<void> => {
  formLoading.value = true

  data.children && delete data.children
  data.role && delete data.role
  data.department && delete data.department
  !data.id && delete data.id

  if (!data.roles[0]?.id && !data.departments[0]?.id) {
    data.roles = data.roles.map((item) => ({ id: item }))
    data.departments = data.departments.map((item) => ({ id: item }))
  }
  const { status, message } = await editMenu({
    ...data,
    externalLink: data.externalLink || null,
    parentId: !data.parentId ? 0 : data.parentId,
  })
  if (status === 1000) {
    await findMany()
    await useMenuStore().fetchPermissionMenus()
    visible.value = false
    formData.value = {}
    // 修改菜单后，需要实时刷新 tabNav 上的数据
    navTabsStore.editNavigator(data)
    MessageSuccess(data?.id ? '修改成功' : '添加成功')
  } else {
    MessageError(`添加失败: ${message}`)
  }
  formLoading.value = false
}

export const remove = async (id: number): Promise<void> => {
  const { status, message } = await deleteMenu(id)
  if (status === 1000) {
    await useMenuStore().fetchPermissionMenus()
    await findMany()
    // 删除菜单后，需要实时刷新 tabNav 上的数据
    const idx = navTabsStore.navigators.findIndex((item) => item.meta.id === id)
    navTabsStore.closeNavTab(idx)
    MessageSuccess('删除成功')
  } else {
    MessageError(`删除失败: ${message}`)
  }
}

export const search = async (name) => {
  tableLoading.value = true
  const { status, data } = await searchMenu(name)
  if (status === 1000) {
    menus.value = data
    tableLoading.value = false
  }
}
