import { ref, reactive } from 'vue'
import type { FormRules } from 'element-plus'
import { ICategory } from '@/types/category'
import { IOptions } from '@/types/form'
import { edit } from './useHttp'

export const visible = ref<boolean>(false)
export const formLoading = ref<boolean>(false)
export const models = ref<IOptions[]>()

export const formData = ref<ICategory>({
  id: null,
  name: '',
  aliasName: '',
  description: '',
  keyword: '',
  image: '',
  modelId: '',
})

export const formRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入栏目名称', trigger: 'blur' }],
  modelId: [{ required: true, message: '请选择栏目模型', trigger: 'change' }],
})

export const formRows = ref([
  {
    component: 'Input',
    label: '栏目名称',
    prop: 'name',
    width: '100%',
  },
  {
    component: 'Input',
    label: '别名',
    prop: 'aliasName',
    width: '100%',
  },
  {
    component: 'Select',
    label: '选择模型',
    prop: 'modelId',
    options: models,
  },
  {
    component: 'Select',
    label: '图片',
    prop: 'image',
  },
  {
    component: 'Input',
    label: '关键词',
    prop: 'keyword',
    width: '100%',
    placeholder: '多个关键词之间用半角逗号“,”分隔，如：名称,别名',
  },
  {
    component: 'Input',
    label: '摘要描述',
    prop: 'description',
    type: 'textarea',
    width: '100%',
  },
])

export const handleSubmit = async (valid) => {
  if (valid) await edit(formData.value)
}
