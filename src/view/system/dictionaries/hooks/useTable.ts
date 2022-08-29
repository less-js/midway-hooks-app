import { ref } from 'vue'
import { ConfirmBox } from '@/utils/message'
import { IColumns } from '@/types/table'
import { IDictionary } from '@/types/dictionary'
import { remove } from './useHttp'
import { visible, formData } from './useForm'

export const tableLoading = ref<boolean>(true)
export const dictionaries = ref<IDictionary[]>([])

export const columns: IColumns[] = [
  {
    prop: 'name',
    label: '名称',
    sortable: true,
    minWidth: '120',
  },
  {
    prop: 'aliasName',
    label: '别名',
    minWidth: '120',
  },
  {
    prop: 'statusText',
    label: '是否启用',
    sortable: true,
    width: '110',
    align: 'center',
    slots: 'html',
  },
  {
    prop: 'remark',
    label: '备注',
    minWidth: '200',
  },
  {
    prop: 'enumElementTypeText',
    label: '字典元素类型',
    sortable: true,
    width: '140',
    align: 'center',
  },
  {
    prop: 'createdAt',
    label: '添加时间',
    width: '180',
    align: 'center',
  },
  {
    prop: 'updatedAt',
    label: '更新时间',
    width: '180',
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
        method: (row: IDictionary) => {
          if (!row) return
          visible.value = true
          formData.value = { ...row }
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
