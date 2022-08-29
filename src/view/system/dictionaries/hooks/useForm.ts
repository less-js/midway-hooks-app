import { ref, reactive, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ConfirmBox } from '@/utils/message'
import { IDictionary } from '@/types/dictionary'
import { IInput, IRadio, ISelect } from '@/types/form'
import { edit } from './useHttp'

export const visible = ref<boolean>(false)
export const formLoading = ref<boolean>(false)
export const formRef = ref<FormInstance>()

export const formData = ref<IDictionary>({
  name: '',
  aliasName: '',
  remark: '',
  status: true,
  enumElementType: 'string',
  enumElements: [{ label: null, value: null, isEnable: true, remark: null }],
})

const checkAlias = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('别名不能为空'))
  } else if (!/^[a-zA-Z]+$/.test(value)) {
    callback(new Error('别名只能由英文组成！'))
  } else {
    callback()
  }
}
export const formRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入字典名称', trigger: 'blur' }],
  aliasName: [{ required: true, validator: checkAlias, trigger: 'blur' }],
})

export const formRows = ref<[IInput, IInput, IRadio, IInput, ISelect]>([
  {
    component: 'Input',
    label: '名称',
    prop: 'name',
    placeholder: '请输入字典名称',
  },
  {
    component: 'Input',
    label: '别名（英文）',
    prop: 'aliasName',
    placeholder: '请输入别名（英文）',
  },
  {
    component: 'Radio',
    label: '是否启用',
    prop: 'status',
    button: true,
    options: [
      { value: '启用', label: true },
      { value: '禁用', label: false },
    ],
  },
  {
    component: 'Input',
    label: '备注',
    prop: 'remark',
    placeholder: '请输入备注',
  },
  {
    component: 'Select',
    label: '字典枚举元素类型',
    prop: 'enumElementType',
    placeholder: '请选择类型',
    options: [
      { label: '字符串', value: 'string' },
      { label: '数字', value: 'number' },
    ],
  },
])

export const isDisabled = computed(() =>
  formData.value.enumElements.some((item) => typeof item.value === 'string')
)

export const handleAddEnum = () => {
  formData.value.enumElements.push({ label: null, value: null, isEnable: true })
}

export const handleRemoveEnum = (index) => {
  const msg = formData.value.enumElements[index].label
    ? formData.value.enumElements[index].label
    : `第 ${index + 1} 行`
  ConfirmBox(`确定删除 ${msg}？`)
    .then(() => {
      formData.value.enumElements.splice(index, 1)
    })
    .catch(() => {})
}

export const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      formData.value.statusText && delete formData.value.statusText
      formData.value.enumElementTypeText && delete formData.value.enumElementTypeText
      await edit(formData.value)
    }
  })
}

export const handleReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  ConfirmBox('是否重置表单数据？')
    .then(() => {
      formEl.resetFields()
    })
    .catch(() => {})
}

export const handleBeforeClose = (done: () => void) => {
  ConfirmBox('是否退出当前编辑？')
    .then(() => {
      visible.value = false
      formData.value = {
        name: '',
        aliasName: '',
        remark: '',
        status: true,
        enumElementType: 'string',
        enumElements: [{ label: null, value: null, isEnable: true, remark: null }],
      }
      done()
    })
    .catch(() => {})
}
