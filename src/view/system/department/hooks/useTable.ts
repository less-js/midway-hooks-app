import { ref } from 'vue'
import { ConfirmBox } from '@/utils/message'
import { IColumns } from '@/types/table'
import { IDepartment } from '@/types/department'
import { remove } from './useHttp'
import { visible, formData } from './useForm'

export const tableLoading = ref<boolean>(true)
export const departments = ref<IDepartment[]>()

export const columns: IColumns[] = [
  {
    prop: 'name',
    label: '名称',
    minWidth: '120',
    sortable: true,
  },
  {
    prop: 'order',
    label: '序号',
    sortable: true,
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
        method: (row: IDepartment) => {
          if (!row) return
          const { id, name, order, parentId } = row
          formData.value = {
            id,
            name,
            order,
            parentId: parentId === 0 ? null : parentId,
          }
          visible.value = true
        },
      },
      {
        type: 'danger',
        icon: 'Delete',
        method: ({ id, name }) => {
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
