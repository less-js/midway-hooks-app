import { ref, reactive } from 'vue'
import type { FormRules } from 'element-plus'
import { edit } from './useHttp'
import { IRole } from '@/types/role'

export const visible = ref<boolean>(false)
export const formLoading = ref<boolean>(false)

export const formData = ref<IRole>({
  id: null,
  name: '',
  label: '',
  remark: '',
})

export const formRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
})

export const formRows = [
  {
    component: 'Input',
    label: '角色名称',
    prop: 'name',
    width: '100%',
  },
  {
    component: 'Input',
    label: '标签',
    prop: 'label',
    width: '100%',
  },
  {
    component: 'Input',
    label: '备注',
    prop: 'remark',
    type: 'textarea',
    width: '100%',
  },
]

export const handleSubmit = async (valid) => {
  if (valid) await edit(formData.value)
}
