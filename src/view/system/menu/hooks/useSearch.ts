import { reactive, watch } from 'vue'
import type { FormRules } from 'element-plus'
import { search, findMany } from './useHttp'

export const searchFormRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
})

export const searchFormData = reactive({ name: '' })

export const searchFormRows = [
  {
    component: 'Input',
    label: '菜单名称',
    prop: 'name',
    width: '300',
  },
  {
    component: 'Button',
    buttons: [
      {
        value: '查询',
        type: 'primary',
        prop: 'submit',
      },
      {
        value: '重置',
        type: 'danger',
        prop: 'reset',
      },
    ],
  },
]

export const handleSearch = async ({ valid }) => {
  if (valid) {
    await search(searchFormData.name)
  }
}

watch(
  () => searchFormData.name,
  async (v) => {
    if (!v) await findMany()
  }
)
