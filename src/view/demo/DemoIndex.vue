<template>
  <el-button @click="dialogVisible = true">dialogVisible</el-button>
  <la-dialog v-model="dialogVisible" title="标题" @on-event="handleDialog">
    <la-form
      ref="formEl2"
      :formRows="frow"
      :model="formData"
      :rules="rules1"
      @on-event="handleEvent"
    />
  </la-dialog>
  <el-card body-style="padding: 20px 20px 0 20px">
    <la-form
      ref="formEl"
      :formRows="formRows"
      :model="formData"
      :rules="rules"
      @on-event="handleEvent"
    >
      <template #test> <el-input /> </template>
    </la-form>
  </el-card>
  <el-card class="mt-5">
    <la-table
      :max-height="1100"
      :data="tableData"
      :columns="columns"
      :pageTotal="page.total"
      v-model:currentPage="page.currentPage"
      v-model:pageSize="page.pageSize"
      @selection-change="handleSelectionChange"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <template #header>
        <strong>菜单列表</strong>
        <el-button type="primary" icon="Plus" @click="drawer.visible = true">添加菜单</el-button>
      </template>
    </la-table>
  </el-card>

  <la-drawer v-model="drawer.visible" :title="drawer.title">
    <el-form>
      <el-input v-model="drawerForm.user" />
    </el-form>
  </la-drawer>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, getCurrentInstance } from 'vue'
import { IColumns, IPage } from '@/types/table'
import { IInput, IFormRow, ICascaderOption, ITransferOption } from '@/types/form'

const formEl2 = ref()
const rules1 = reactive({
  name1: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
})
const frow = [
  [
    {
      component: 'Input',
      label: '姓名',
      prop: 'name1',
      clearable: true,
      inputStyle: {
        color: 'red',
      },
    },
  ],
]
const dialogVisible = ref(false)
const handleDialog = (v) => {
  console.log(v)
  if (!v || v === 'reset') {
    formEl2.value.formRef.resetFields()
    return
  }
  console.log(formEl2.value.formRef)
  formEl2.value.formRef.validate((valid, message) => {
    console.log(valid)
  })
}

const formEl = ref()
const rules = reactive({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
})
const formData = reactive({
  name: '',
  delivery: false,
  resource: '',
  info: '',
  num: 0,
  cascader: [],
  checks: [],
  checkGroup: [],
  colorPicker: '',
  datepicker: '',
  TimePicker: '',
  timeselect: '',
  radio: '',
  rate: null,
  select: null,
  slider: [],
  switch: true,
  transfer: [2, 3],
  fileList: [
    {
      name: 'food.jpeg',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    },
    {
      name: 'food2.jpeg',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    },
    {
      name: 'food.jpeg',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    },
    {
      name: 'food2.jpeg',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    },
    {
      name: 'food.jpeg',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    },
    {
      name: 'food2.jpeg',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    },
    {
      name: 'food.jpeg',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    },
    {
      name: 'food2.jpeg',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    },
  ],
  date0: '',
})
const cascaderOption: ICascaderOption[] = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
]
const generateData = () => {
  const data: ITransferOption[] = []
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `Option ${i}`,
      disabled: i % 4 === 0,
    })
  }
  return data
}
const formRows = [
  {
    component: 'Button',
    buttons: [
      {
        value: '啥也不是',
        prop: 'submit1',
        span: 3,
        icon: 'Edit',
        onClick: (v) => {
          console.log(v)
        },
      },
      {
        value: '提交',
        prop: 'submit',
        span: 3,
        icon: 'Edit',
      },
      {
        value: '重置',
        type: 'danger',
        prop: 'reset',
        span: 3,
      },
    ],
  },
  { component: 'slot', label: '自定义slot', prop: 'date0', slotName: 'test' },
  {
    component: 'upload',
    label: '上传',
    prop: 'fileList',
    action: 'http://httpbin.org/anything',
    uploadIcon: true,
    // tips: '上传提示语',
    // drag: true,
    dragText: `拖拽上传或<em>点击上传</em>`,
    listType: 'picture-card',
    onChange: (uploadFile, uploadFiles) => {
      // 这里拿到文件上传后端返回的数据
      console.log(uploadFile, uploadFiles)
    },
    onRemove: (file, uploadFiles) => {
      console.log(file, uploadFiles)
    },
    onPreview: (file) => {
      console.log(file)
    },
  },
  {
    component: 'transfer',
    label: '穿梭框',
    prop: 'transfer',
    data: generateData(),
    filterable: true,
  },
  {
    component: 'switch',
    label: '开关',
    prop: 'switch',
    span: 4,
    offset: 2,
  },
  {
    component: 'switch',
    label: '开关',
    prop: 'switch',
    span: 12,
  },
  {
    component: 'slider',
    label: '滑块',
    prop: 'slider',
  },
  {
    component: 'select',
    label: '下拉框',
    prop: 'select',
    options: [
      { label: 'bbbbb', vaule: 'xxx' },
      { label: 'aaaaaaa', value: 'ccc' },
      { label: 'cccccc', value: 'aaa' },
    ],
    multiple: true,
  },
  {
    component: 'rate',
    label: '评分',
    prop: 'rate',
  },
  {
    component: 'radio',
    label: '单选',
    prop: 'radio',
    button: true,
    options: [
      { label: 'b', vaule: 'xxx' },
      { label: 'a', value: 'ccc' },
      { label: 'c', value: 'aaa' },
    ],
  },
  {
    component: 'radio',
    label: '单选',
    prop: 'radio',
    options: [
      { label: 'xxx', vaule: '123' },
      { label: 'de', value: 'uuuu' },
      { label: 'def', value: 'sdfsdf' },
    ],
  },
  {
    component: 'TIMESELECT',
    label: '时间选择器',
    prop: 'timeselect',
  },
  {
    component: 'TimePicker',
    label: '时间选择器',
    prop: 'TimePicker',
  },
  {
    component: 'datepicker',
    label: '日期选择器',
    prop: 'datepicker',
    type: 'datetime',
    // format: 'YYYY-MM-DD',
    // valueFormat: 'YYYY-MM-DD',
  },
  {
    component: 'COLORPICKER',
    label: '颜色选择器',
    prop: 'colorPicker',
    colorFormat: 'rgb',
  },
  {
    component: 'checkbox',
    label: '多选框',
    prop: 'checks',
    button: true,
    options: [
      {
        label: 1,
        value: 'ccf',
      },
      {
        label: 2,
        value: 'xxy',
      },
    ],
  },
  {
    component: 'checkbox',
    label: '多选框',
    prop: 'checks',
    options: ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'],
  },
  {
    component: 'Input',
    label: '姓名',
    prop: 'name',
    clearable: true,
    inputStyle: {
      color: 'red',
    },
  },
  {
    component: 'Input',
    label: '描述',
    prop: 'info',
    type: 'textarea',
  },
  {
    component: 'inputNumber',
    label: '数字',
    prop: 'num',
  },
  {
    component: 'cascader',
    label: '级联选择器',
    prop: 'cascader',
    options: cascaderOption,
    props: { expandTrigger: 'hover' },
    filterable: true,
  },
]
const handleEvent = (data) => {
  console.log(data)
  // formData[params.prop] = params.value
}

// 测试：监听 from 表单数据变化
watch(
  () => formData.name,
  () => {
    console.log(formData)
  }
)

const page = reactive<IPage>({
  total: 100,
  currentPage: 3,
  pageSize: 3,
})
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

const drawer = reactive({
  visible: false,
  title: 'I am title!',
})
const drawerForm = reactive({
  user: '',
})
watch(
  () => drawer.visible,
  () => {
    // 如果关闭 LaDrawer
    if (!drawer.visible) {
      drawerForm.user = ''
    }
  }
)

const formInline = reactive({
  user: '',
  region: '',
})

const handleSearch = () => {
  console.log('submit!')
}

interface User {
  id: number
  date: string
  name: string
  children?: User[]
  icon: string
  component: string
  permission: string
  status: boolean
  hidden: boolean
  order: string
  path: string
}
const tableData: User[] = [
  {
    id: 1,
    date: '2016-05-02 10:10:11',
    icon: 'edit',
    component: '/manage/ManageUser',
    status: true,
    permission: 'user',
    hidden: false,
    order: '1',
    path: '/mange/user',
    name: '水电费水电费是否第三方士大夫五色饭',
  },
  {
    id: 2,
    date: '2016-05-04',
    icon: 'edit',
    component: '/manage/ManageUser',
    status: true,
    permission: 'user',
    hidden: false,
    order: '1',
    path: '/mange/user',
    name: 'wangxiaohu',
  },
  {
    id: 3,
    date: '12016-05-01',
    icon: 'edit',
    component: '/manage/ManageUser',
    status: true,
    permission: 'user',
    hidden: false,
    order: '2',
    path: '/mange/user',
    name: 'wangxiaohu',
    children: [
      {
        id: 31,
        date: '2222222016-05-01',
        icon: 'edit',
        component: '/manage/ManageUser',
        status: true,
        permission: 'user',
        hidden: false,
        order: '1',
        path: '/mange/user',
        name: 'qweqweqwangxiaohu',
      },
      {
        id: 32,
        date: '333332016-05-01',
        icon: 'edit',
        component: '/manage/ManageUser',
        status: true,
        permission: 'user',
        hidden: false,
        order: '1',
        path: '/mange/user',
        name: 'dvcxvxwangxiaohu',
      },
    ],
  },
  {
    id: 4,
    date: '2016-05-03',
    icon: 'edit',
    component: '/manage/ManageUser',
    status: true,
    permission: 'user',
    hidden: false,
    order: '1',
    path: '/mange/user',
    name: 'wangxiaohu',
  },
]
const columns: IColumns[] = [
  {
    prop: 'selection',
    type: 'selection',
    label: 'selection',
    width: '49',
    fixed: 'left',
    align: 'center',
  },
  {
    prop: 'name',
    label: '菜单名称',
    minWidth: '180',
  },
  {
    prop: 'order',
    label: '排序',
    width: '180',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'icon',
    label: '图标',
    width: '60',
    align: 'center',
  },
  {
    label: '操作',
    prop: 'option',
    align: 'center',
    fixed: 'right',
    width: '110',
    slots: 'option',
    option: [
      {
        type: 'primary',
        icon: 'Edit',
        method: (index, row) => {
          console.log(index, row)
        },
      },
      {
        type: 'danger',
        icon: 'Delete',
        method: (index, row) => {
          console.log(index, row)
        },
      },
    ],
  },
]

const multipleSelection = ref<User[]>([])
const handleSelectionChange = (val: User[]) => {
  console.log(val)
  multipleSelection.value = val
}
</script>
