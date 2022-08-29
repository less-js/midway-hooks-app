import { ref } from 'vue'
import { IFieldType, IField } from '@/types/model'
import { IOptions } from '@/types/form'
import { fieldFormVisible, defaultRows, fieldFormRows, fieldFormData } from './useFieldForm'
import { tabActiveIndex, modelList } from './useModelList'
import { edit } from './useHttp'

export const selectedField = ref<IFieldType>({
  icon: null,
  label: null,
  value: null,
})
export const fieldTypes = ref<IFieldType[]>([])
export const fieldTypeMap = ref({})
export const dictionaries = ref<IOptions[]>([])

const switchFieldType = (type) => {
  switch (type) {
    case 'String':
    case 'MultiLineString':
      fieldFormRows.value[3].component = 'Input'
      fieldFormRows.value.splice(4, 0, {
        component: 'InputNumber',
        label: '最小长度',
        prop: 'min',
        placeholder: '1',
      })
      fieldFormRows.value[3].component = 'Input'
      fieldFormRows.value.splice(5, 0, {
        component: 'InputNumber',
        label: '最大长度',
        prop: 'max',
        placeholder: '99',
      })
      break
    case 'Number':
      fieldFormRows.value[3].component = 'InputNumber'
      fieldFormRows.value.splice(4, 0, {
        component: 'InputNumber',
        label: '最小值',
        prop: 'min',
        placeholder: '1',
      })
      fieldFormRows.value.splice(5, 0, {
        component: 'InputNumber',
        label: '最大值',
        prop: 'max',
        placeholder: '99',
      })
      break
    case 'Boolean':
      fieldFormRows.value.splice(3, 1, {
        component: 'Radio',
        label: '默认值',
        prop: 'defaultValue',
        button: true,
        options: [
          { label: 1, value: 'True' },
          { label: 0, value: 'False' },
        ],
      })
      break
    case 'Enum':
      fieldFormRows.value.splice(3, 1, {
        component: 'Select',
        label: '枚举元素',
        prop: 'enum',
        placeholder: '',
        options: dictionaries,
      })
      break
    case 'Connect':
      fieldFormRows.value.splice(3, 1, {
        component: 'Select',
        label: '关联内容',
        prop: 'connectResource',
        placeholder: '',
      })
      fieldFormRows.value.splice(4, 0, {
        component: 'Select',
        label: '关联展示字段',
        prop: 'connectField',
        placeholder: '',
      })
      fieldFormRows.value.splice(5, 0, {
        component: 'Switch',
        label: '是否关联多项',
        prop: 'connectMany',
        placeholder: '',
        inactiveText: '否',
        activeText: '是',
      })
      break
    case 'Array':
      fieldFormRows.value.splice(3, 1)
      break
    case 'DateTime':
      fieldFormRows.value.splice(3, 1, {
        component: 'DatePicker',
        label: '默认值',
        prop: 'defaultValue',
        placeholder: '请选择日期时间',
        type: 'datetime',
      })
      break
    case 'Image':
    case 'File':
    case 'Media':
      fieldFormRows.value.splice(3, 1, {
        component: 'Select',
        label: '资源链接格式',
        prop: 'resourceLinkType',
        placeholder: '资源链接格式',
        options: [{ value: 0, label: 'HTTPS' }],
      })
      fieldFormRows.value.splice(4, 0, {
        component: 'Switch',
        label: '允许多个内容',
        prop: 'isMultiple',
        placeholder: '',
        inactiveText: '否',
        activeText: '是',
      })
      break
    case 'Json':
      fieldFormRows.value.splice(3, 1, {
        component: 'Input',
        label: 'JSON 字符串',
        type: 'textarea',
        prop: 'defaultValue',
        placeholder: '请输入 JSON 字符串',
        width: '100%',
      })
      break
    default:
      fieldFormRows.value[3].component = 'Input'
      break
  }
}

export const handleEditField = (row: IFieldType | IField) => {
  const schema = row as IField
  const fieldType = row as IFieldType

  if (schema.id) {
    selectedField.value.value = schema.type
    fieldFormData.value = { ...schema }
  } else {
    selectedField.value = { ...fieldType }
  }

  fieldFormRows.value = []
  fieldFormRows.value = [...defaultRows.value]
  switchFieldType(selectedField.value.value)
  fieldFormVisible.value = true
}

export const handleDeleteField = async (row) => {
  const { id, name, collectionName, description, fields } =
    modelList.value[parseInt(tabActiveIndex.value)]

  await edit({
    id,
    name,
    collectionName,
    description,
    fields: fields.filter((item) => item.id !== row.id),
  })
}
