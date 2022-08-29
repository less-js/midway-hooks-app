import { ref } from 'vue'
import { ConfirmBox } from '@/utils/message'
import { IColumns } from '@/types/table'
import { IAvatar, IUser } from '@/types/user'
import { remove } from './useHttp'
import { visible, userFormData } from './useForm'
import { edit } from './useHttp'

export const tableLoading = ref<boolean>(true)
export const users = ref<IUser[]>()

export const columns: IColumns[] = [
  {
    prop: 'avatar',
    label: '头像',
    minWidth: '78',
    align: 'center',
    slots: 'image',
    props: {
      width: 50,
      height: 50,
    },
  },
  {
    prop: 'username',
    label: '账号',
    sortable: true,
  },
  {
    prop: 'name',
    label: '姓名',
    sortable: true,
  },
  {
    prop: 'nickname',
    label: '昵称',
  },
  {
    prop: 'role',
    label: '所属角色',
    minWidth: '140',
    slots: 'html',
  },
  {
    prop: 'department',
    label: '所属部门',
    minWidth: '140',
    slots: 'html',
  },
  {
    prop: 'phone',
    label: '联系电话',
    minWidth: '120',
    align: 'center',
  },
  {
    prop: 'email',
    label: '邮箱',
    minWidth: '200',
    align: 'center',
  },
  {
    prop: 'status',
    label: '是否启用',
    minWidth: '120',
    align: 'center',
    sortable: true,
    slots: 'switch',
    props: {
      width: 48,
      activeText: '启用',
      inActiveText: '禁用',
    },
  },
  {
    prop: 'createdAt',
    label: '创建时间',
    minWidth: '180',
    align: 'center',
  },
  {
    prop: 'updatedAt',
    label: '更新时间',
    minWidth: '180',
    align: 'center',
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
        method: (row: IUser) => {
          if (!row) return
          const {
            id,
            name,
            password,
            username,
            nickname,
            avatar,
            email,
            phone,
            status,
            remark,
            roles,
            departments,
          } = row
          userFormData.value = {
            id,
            name,
            password,
            username,
            nickname,
            email,
            phone,
            remark,
            status: status ? 1 : 0,
            avatar: [{ name: '', url: avatar }] as IAvatar[],
            roles: roles.map((item) => item.id),
            departments: departments.map((item) => item.id),
          }
          visible.value = true
        },
      },
      {
        type: 'danger',
        icon: 'Delete',
        method: ({ id, username }) => {
          if (!id) return
          ConfirmBox(`确定删除 ${username} ?`)
            .then(async () => {
              await remove(id)
            })
            .catch(() => {})
        },
      },
    ],
  },
]

export const handleRowEdit = async (row: IUser): Promise<void> => {
  delete row.role
  delete row.department
  const avatar: IAvatar[] = [{ name: '', url: row.avatar as string }]
  if (Object.keys(row).length > 0) await edit({ ...row, avatar })
}
