import { ref, reactive, watch } from 'vue'
import type { FormRules } from 'element-plus'
import { IDepartment } from '@/types/department'
import { IOptions } from '@/types/form'
import { treeFilter } from '@/utils/common'
import { edit } from './useHttp'

export const visible = ref<boolean>(false)
export const formLoading = ref<boolean>(false)
export const departmentOptions = ref<IOptions[]>()

export const formData = ref<IDepartment>({
  id: null,
  name: '',
  parentId: null,
  order: 0,
})

export const formRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
})

export const formRows = ref([
  {
    component: 'Input',
    label: '部门名称',
    prop: 'name',
    width: '430',
  },
  {
    component: 'TreeSelect',
    label: '上级部门',
    prop: 'parentId',
    options: departmentOptions,
  },
  {
    component: 'InputNumber',
    label: '序号',
    prop: 'order',
  },
])

watch(
  () => formData.value,
  (val) => {
    formRows.value[1]['options'] = treeFilter(
      departmentOptions.value,
      (item) => item.label !== val.name && item.parentId !== val.id
    )
  }
)

export const handleSubmit = async (valid) => {
  if (valid) await edit(formData.value)
}
