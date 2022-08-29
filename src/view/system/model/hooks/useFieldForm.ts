import { ref, reactive, computed, watch } from 'vue'
import type { FormRules } from 'element-plus'
import useTitle from '@/hooks/useTitle'
import { filterParams } from '@/utils/common'
import { IField } from '@/types/model'
import { tabActiveIndex, modelList } from './useModelList'
import { selectedField } from './useFieldTypes'
import { edit } from './useHttp'
import { v4 as uuid } from 'uuid'

export const fieldFormLoading = ref<boolean>(false)
export const fieldFormVisible = ref<boolean>(false)

export const fieldFormData = ref<IField>({
  id: null,
  type: '', // 字段类型：如单行字符串
  displayName: '',
  name: '',
  description: '',
  defaultValue: null,
  min: null,
  max: null,
  isRequired: false,
  isHidden: false,
  isOrderField: false,
  orderDirection: 'desc',
})

export const fieldFormTitle = computed(() =>
  useTitle(fieldFormData.value?.id, '字段', `${selectedField.value?.label}`)
)

const checkName = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('数据库字段名不能为空'))
  } else if (!/^[a-zA-Z]+$/.test(value)) {
    callback(new Error('数据库字段名只能由英文组成！'))
  } else {
    callback()
  }
}
export const fieldFormRules = reactive<FormRules>({
  displayName: [{ required: true, message: '请输入字段名称', trigger: 'blur' }],
  name: [{ required: true, validator: checkName, trigger: 'blur' }],
})

export const fieldFormRows = ref<any>()
export const defaultRows = ref([
  {
    component: 'Input',
    label: '字段名称',
    prop: 'displayName',
    placeholder: '请输入字段名称，如文章标题',
    width: '100%',
  },
  {
    component: 'Input',
    label: '数据库字段名',
    prop: 'name',
    placeholder: '请输入数据库字段名，如title',
    width: '100%',
  },
  {
    component: 'Input',
    label: '描述',
    prop: 'description',
    type: 'textarea',
    placeholder: '请输入字段描述，如博客文章标题',
    width: '100%',
  },
  {
    component: 'Input',
    label: '默认值',
    prop: 'defaultValue',
    placeholder: '字段默认值',
    width: '100%',
  },
  {
    component: 'Switch',
    label: '是否必填',
    prop: 'isRequired',
    inactiveText: '否',
    activeText: '是',
  },
  {
    component: 'Switch',
    label: '是否隐藏',
    prop: 'isHidden',
    inactiveText: '否',
    activeText: '是',
  },
  {
    component: 'Switch',
    label: '设为排序字段',
    prop: 'isOrderField',
    inactiveText: '否',
    activeText: '是',
    onChange: (v) => {
      if (!v && fieldFormRows.value.at(-1).prop === 'orderDirection') {
        fieldFormRows.value.pop()
      } else {
        fieldFormRows.value.push({
          component: 'Select',
          label: '排序规则',
          prop: 'orderDirection',
          placeholder: '请选择排序规则',
          clearable: false,
          options: [
            { value: 'desc', label: '降序（越大越靠前）' },
            { value: 'asc', label: '升序（越小越靠前）' },
          ],
        })
      }
    },
  },
])

watch(
  () => fieldFormData.value.isOrderField,
  (val) => {
    if (val) {
      console.log(val)
      fieldFormData.value.orderDirection = 'desc'
      if (fieldFormRows.value.at(-1).prop !== 'orderDirection') {
        fieldFormRows.value.push({
          component: 'Select',
          label: '排序规则',
          prop: 'orderDirection',
          placeholder: '请选择排序规则',
          options: [
            { value: 'desc', label: '降序（越大越靠前）' },
            { value: 'asc', label: '升序（越小越靠前）' },
          ],
        })
      }
    }
  }
)

export const handleFieldSubmit = async (valid) => {
  const currentModel = modelList.value[parseInt(tabActiveIndex.value)]

  if (!fieldFormData.value.isOrderField && fieldFormData.value.orderDirection) {
    delete fieldFormData.value.orderDirection
  }

  if (!fieldFormData.value.id) {
    fieldFormData.value.type = selectedField.value.value
    currentModel.fields.push({ ...filterParams(fieldFormData.value), id: uuid() })
  } else {
    const index = currentModel.fields.findIndex((item) => item.id === fieldFormData.value.id)
    currentModel.fields[index] = { ...fieldFormData.value }
  }

  if (valid) await edit({ ...currentModel })
}
