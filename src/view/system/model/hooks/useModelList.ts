import { ref, computed } from 'vue'
import { ConfirmBox } from '@/utils/message'
import type { SortableOptions, SortableEvent } from 'sortablejs'
import { IModel } from '@/types/model'
import { remove, edit } from './useHttp'

export const sortablejsOptions = computed<SortableOptions>(() => ({
  draggable: '.draggable',
  animation: 150,
  ghostClass: 'ghost',
  dragClass: 'drag',
}))

export const modelListLoading = ref<boolean>(true)
export const tabActiveIndex = ref<string>('0')
export const hiddenSystemField = ref<boolean>(false)
export const modelList = ref<IModel[]>([])

export const handleUpdateSort = async (event: SortableEvent) => {
  const { oldIndex, newIndex } = event
  const fieldList = modelList.value[tabActiveIndex.value].fields
  const oldField = fieldList[oldIndex]
  fieldList.splice(oldIndex, 1)
  fieldList.splice(newIndex, 0, { ...oldField })

  await edit({ ...modelList.value[tabActiveIndex.value] })
}

export const handleDeleteModel = (row: IModel) => {
  ConfirmBox(`确定删除 ${row.name}`)
    .then(async () => {
      await remove(row.id)
    })
    .catch(() => {})
}
