import { ref, reactive, watch } from 'vue'
import type { FormRules } from 'element-plus'
import { treeFilter } from '@/utils/common'
import { edit } from './useHttp'
import { IMenu } from '@/types/menu'
import { IOptions } from '@/types/form'

export const visible = ref<boolean>(false)
export const formLoading = ref<boolean>(false)
export const roles = ref<IOptions[]>()
export const departments = ref<IOptions[]>()
export const parentMenus = ref<IOptions[]>()

export const formData = ref<IMenu>({
  id: '',
  name: '',
  routePath: '',
  routeName: '',
  component: '',
  icon: '',
  parentId: null,
  isAuth: false,
  isCache: false,
  hidden: false,
  externalLink: '',
  order: 0,
  status: true,
  departments: [],
  roles: [],
})
const strRegex =
  '^((https|http|rtsp|mms)?://)' +
  // '^((https|http|ftp|rtsp|mms)?://)' +
  // "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + //ftp的user@
  '(([0-9]{1,3}.){3}[0-9]{1,3}' + // IP形式的URL- 199.194.52.184
  '|' + // 允许IP和DOMAIN（域名）
  "([0-9a-z_!~*'()-]+.)*" + // 域名- www.
  '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' + // 二级域名
  '[a-z]{2,6})' + // first level domain- .com or .museum
  '(:[0-9]{1,4})?' + // 端口- :80
  '((/?)|' + // a slash isn't required if there is no file name
  "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"
const reg = new RegExp(strRegex)
const checkExternalLink = (rule: any, value: any, callback: any) => {
  if (value && !reg.test(value)) {
    callback(new Error('外链地址不正确'))
  } else {
    callback()
  }
}
export const formRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  roles: [{ required: true, message: '请选择所属角色', trigger: 'change' }],
  departments: [{ required: true, message: '请选择所属部门', trigger: 'change' }],
  routeName: [{ required: true, message: '请输入 route name', trigger: 'blur' }],
  routePath: [{ required: true, message: '请输入 route path', trigger: 'blur' }],
  component: [{ required: true, message: '请输入组件名称', trigger: 'blur' }],
  externalLink: [{ validator: checkExternalLink, trigger: 'blur' }],
})

watch(
  () => formData.value,
  (val) => {
    if (val) {
      formRows.value[2]['options'] = treeFilter(
        parentMenus.value,
        (item) => item.label !== val.name && item.parentId !== val.id
      )
    }
  },
  { deep: true }
)
watch(
  () => visible.value,
  (val) =>
    !val &&
    (formData.value = {
      id: '',
      name: '',
      routePath: '',
      routeName: '',
      component: '',
      icon: '',
      parentId: null,
      isAuth: false,
      isCache: false,
      hidden: false,
      externalLink: '',
      order: 0,
      status: true,
      departments: [],
      roles: [],
    })
)

export const formRows = ref([
  {
    component: 'Input',
    label: '菜单名称',
    prop: 'name',
  },
  {
    component: 'InputNumber',
    label: '排序',
    prop: 'order',
  },
  {
    component: 'TreeSelect',
    label: '上级菜单',
    prop: 'parentId',
    options: parentMenus,
  },
  {
    component: 'slot',
    label: '图标',
    prop: 'icon',
    slotName: 'icon',
  },
  {
    component: 'Select',
    label: '角色',
    prop: 'roles',
    multiple: true,
    placeholder: '可选择多个角色',
    options: roles,
  },
  {
    component: 'Select',
    label: '部门',
    prop: 'departments',
    multiple: true,
    placeholder: '可选择多个部门',
    options: departments,
  },
  {
    component: 'Input',
    label: '路由 name',
    prop: 'routeName',
    placeholder: '路由 name 以大写字母开头',
    width: '520',
  },
  {
    component: 'Input',
    label: '路由 path',
    prop: 'routePath',
    width: '520',
  },
  {
    component: 'Input',
    label: '组件文件',
    prop: 'component',
    width: '520',
    placeholder: '如：view/dashboard/DashboardIndex.vue',
  },
  {
    component: 'Input',
    label: '外部链接',
    prop: 'externalLink',
    width: '520',
    placeholder: '如：https://www.xxx.com/abc',
  },
  {
    component: 'Switch',
    label: '状态',
    prop: 'status',
    width: 48,
    activeText: '启用',
    inactiveText: '禁用',
  },
  {
    component: 'Switch',
    label: '是否缓存',
    prop: 'isCache',
    activeText: '是',
    inactiveText: '否',
  },
  {
    component: 'Switch',
    label: '是否隐藏',
    prop: 'hidden',
    width: 48,
    activeText: '显示',
    inactiveText: '隐藏',
  },
])

export const handleSubmit = async (valid) => {
  if (valid) await edit(formData.value)
}
