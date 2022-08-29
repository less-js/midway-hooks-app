import { ref } from 'vue'
import { ConfirmBox } from '@/utils/message'
import { IColumns } from '@/types/table'
import { ICategory } from '@/types/category'
import { remove } from './useHttp'
import { visible, formData } from './useForm'

export const tableLoading = ref<boolean>(true)
export const categories = ref<ICategory[]>()

export const columns: IColumns[] = [
  {
    prop: 'name',
    label: '名称',
    minWidth: '120',
    sortable: true,
  },
  {
    prop: 'aliasName',
    label: '别名',
    minWidth: '120',
  },
  {
    prop: 'modelId',
    label: '所属内容模型',
    minWidth: '120',
  },
  {
    prop: 'image',
    label: '图片',
    minWidth: '120',
  },
  {
    prop: 'keyword',
    label: '关键词',
    minWidth: '120',
  },
  {
    prop: 'description',
    label: '摘要描述',
    minWidth: '120',
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
        method: async (row: ICategory) => {
          if (!row) return
          // const { id, name, label, remark } = row
          // formData.value = { id, name, label, remark }
          formData.value = row
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
