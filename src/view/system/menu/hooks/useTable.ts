import { ref } from 'vue'
import { ConfirmBox } from '@/utils/message'
import { IColumns } from '@/types/table'
import { IMenu } from '@/types/menu'
import { remove } from './useHttp'
import { visible, formData } from './useForm'
import { edit } from './useHttp'

export const tableLoading = ref<boolean>(true)
export const menus = ref<IMenu[]>()

export const columns: IColumns[] = [
  {
    prop: 'name',
    label: '菜单名称',
    minWidth: '120',
    sortable: true,
  },
  {
    prop: 'icon',
    label: '图标',
    width: '60',
    align: 'center',
    slots: 'icon',
  },
  {
    prop: 'order',
    label: '序号',
    minWidth: '78',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'role',
    label: '角色 - ID',
    minWidth: '140',
    slots: 'html',
  },
  {
    prop: 'department',
    label: '部门 - ID',
    minWidth: '120',
    slots: 'html',
  },
  {
    prop: 'component',
    label: 'Component 文件',
    minWidth: '280',
  },
  {
    prop: 'routeName',
    label: '路由 name',
    minWidth: '120',
    align: 'center',
  },
  {
    prop: 'routePath',
    label: '路由 path',
    minWidth: '120',
    align: 'center',
  },
  {
    prop: 'isCache',
    label: '是否缓存',
    width: '110',
    align: 'center',
    slots: 'switch',
    sortable: true,
  },
  {
    prop: 'hidden',
    label: '是否隐藏',
    width: '110',
    align: 'center',
    slots: 'switch',
    sortable: true,
    props: {
      width: 48,
      activeText: '隐藏',
      inActiveText: '显示',
    },
  },
  {
    prop: 'status',
    label: '是否启用',
    width: '110',
    align: 'center',
    slots: 'switch',
    sortable: true,
    props: {
      width: 48,
      activeText: '启用',
      inActiveText: '禁用',
    },
  },
  {
    label: '操作',
    prop: 'option',
    align: 'center',
    fixed: 'right',
    width: '110',
    slots: 'button',
    options: [
      {
        type: 'primary',
        icon: 'Edit',
        method: (row: IMenu) => {
          if (!row) return
          visible.value = true
          formData.value = {
            ...row,
            roles: row.roles.map((item) => item.id),
            departments: row.departments.map((item) => item.id),
            parentId: !row.parentId ? null : row.parentId,
          }
        },
      },
      {
        type: 'danger',
        icon: 'Delete',
        method: ({ name, id }) => {
          if (!id) return
          ConfirmBox(`确定删除 ${name} ?`)
            .then(async () => {
              await remove(id)
            })
            .catch(() => {})
        },
      },
    ],
  },
]

export const handleRowEdit = async (row: IMenu): Promise<void> => {
  delete row.role
  delete row.department
  if (Object.keys(row).length > 0) await edit({ ...row })
}
