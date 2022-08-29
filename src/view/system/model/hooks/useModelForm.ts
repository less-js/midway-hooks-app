import { ref, reactive, computed } from 'vue'
import type { FormRules } from 'element-plus'
import { IModel } from '@/types/model'
import { edit } from './useHttp'

export const modelFormLoading = ref<boolean>(false)
export const modelFormVisible = ref<boolean>(false)

const isCopyModel = ref<boolean>(false)
export const modelFormTitle = computed(() => {
  if (modelFormData.value?.id) {
    return '编辑模型'
  } else if (isCopyModel.value) {
    return '复制模型'
  } else {
    return '新建模型'
  }
})

export const modelFormData = ref<IModel>({
  id: null,
  name: '',
  collectionName: '',
  description: '',
  fields: [],
})

const checkCollectionName = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('数据表名不能为空'))
  } else if (!/^[a-zA-Z]+$/.test(value)) {
    callback(new Error('数据表名只能由英文组成！'))
  } else {
    callback()
  }
}
export const modelFormRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入模型名称', trigger: 'blur' }],
  collectionName: [{ required: true, validator: checkCollectionName, trigger: 'blur' }],
})

export const modelFormRows = ref([
  {
    component: 'Input',
    label: '模型名称',
    prop: 'name',
    placeholder: '请输入模型名称，如文章',
    width: '480',
  },
  {
    component: 'Input',
    label: '数据表名',
    prop: 'collectionName',
    placeholder: '请输入模型数据表名，如 article',
    width: '480',
  },
  {
    component: 'Input',
    type: 'textarea',
    label: '描述信息',
    prop: 'description',
    placeholder: '请输入描述信息，会展示在对应内容的管理页面顶部，可用于内容提示',
    width: '480',
  },
])

export const handleEditModel = (row: IModel) => {
  modelFormVisible.value = true
  modelFormData.value = row
}

export const handleCopyModel = (row: IModel) => {
  isCopyModel.value = true
  modelFormVisible.value = true
  modelFormData.value = {
    name: `${row.name} copy`,
    collectionName: `${row.collectionName} copy`,
    description: `${row.description} copy`,
    fields: row.fields,
  }
}

export const handleModelSubmit = async (valid) => {
  if (valid) await edit(modelFormData.value)
}

export const handleCloseDialog = (val) => {
  if (!val && isCopyModel) isCopyModel.value = false
}
