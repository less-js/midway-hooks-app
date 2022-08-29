import { ref, reactive } from 'vue'
import type { FormRules } from 'element-plus'
import { IUser } from '@/types/user'
import { IOptions } from '@/types/form'
import { uploadImage } from '@/apis/upload'
import { MessageError } from '@/utils/message'
import { edit } from './useHttp'

const previewVisible = ref(false)
const previewImageUrl = ref(null)

export const visible = ref<boolean>()
export const formLoading = ref<boolean>(false)
export const roles = ref<IOptions[]>()
export const departments = ref<IOptions[]>()

export const userFormData = ref<IUser>({})
const checkUsername = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('请输入登录账号'))
  } else if (value && !/^[a-zA-Z][a-zA-Z\d]{2,8}$/.test(value)) {
    callback(new Error('账号只能使用字母开头，不得小于 3 个字符且不得大于 8 个字符'))
  } else {
    callback()
  }
}
const checkName = (rule: any, value: any, callback: any) => {
  if (value && value.length < 2) {
    callback(new Error('姓名不得小于 2 个字符'))
  } else {
    callback()
  }
}
const checkNickname = (rule: any, value: any, callback: any) => {
  if (value && value.length < 1) {
    callback(new Error('姓名不得小于 1 个字符，不得大于 6 个字符'))
  } else {
    callback()
  }
}
const checkPhone = (rule: any, value: any, callback: any) => {
  if (value && !/^1[34578]\d{9}$/.test(value)) {
    callback(new Error('请输入正确的手机号，不得大于 5 个字符'))
  } else {
    callback()
  }
}
const checkEmail = (rule: any, value: any, callback: any) => {
  if (value && !/^([a-zA-Z\d])(\w|\\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/.test(value)) {
    callback(new Error('请输入正确的 E-mail'))
  } else {
    callback()
  }
}
export const formRules = reactive<FormRules>({
  username: [{ required: true, validator: checkUsername, trigger: 'blur' }],
  name: [{ validator: checkName, trigger: 'blur' }],
  nickname: [{ validator: checkNickname, trigger: 'blur' }],
  password: [
    { min: 6, max: 16, message: '密码不得小于 6 个字符且不得大于 30 个字符', trigger: 'blur' },
  ],
  phone: [{ validator: checkPhone, trigger: 'blur' }],
  email: [{ validator: checkEmail, trigger: 'blur' }],
  status: [{ required: true, message: '请选择是否启用', trigger: 'change' }],
  roles: [{ required: true, message: '请选择所属角色', trigger: 'blur' }],
  departments: [{ required: true, message: '请选择所属部门', trigger: 'blur' }],
})

export const formRows = ref([
  {
    component: 'Input',
    label: '登录账号',
    prop: 'username',
  },
  {
    component: 'Input',
    label: '登录密码',
    type: 'password',
    prop: 'password',
  },
  {
    component: 'Radio',
    label: '是否启用',
    prop: 'status',
    button: true,
    options: [
      { value: '启用', label: 1 },
      { value: '禁用', label: 0 },
    ],
  },
  {
    component: 'Select',
    label: '角色',
    prop: 'roles',
    multiple: true,
    options: roles,
  },
  {
    component: 'Select',
    label: '部门',
    prop: 'departments',
    multiple: true,
    options: departments,
  },
  {
    component: 'Input',
    label: '姓名',
    prop: 'name',
  },
  {
    component: 'Input',
    label: '昵称',
    prop: 'nickname',
  },
  {
    component: 'Input',
    label: '手机号码',
    prop: 'phone',
  },
  {
    component: 'Input',
    label: '电子邮箱',
    prop: 'email',
  },
  {
    component: 'Upload',
    label: '头像',
    prop: 'avatar',
    action: '/sys/upload-image',
    showFileList: false,
    tips: '头像不得大于 2MB, 格式为jpg、jpeg、png、gif、wbmp、webp，尺寸为146 * 146',
    dragText: `拖拽上传或<em>点击上传</em>`,
    httpRequest: (file) => {
      const formData = new FormData()
      formData.append('file', file.file)
      uploadImage(formData).then(({ status, data }) => {
        if (status === 1000) {
          userFormData.value.avatar = [
            {
              name: '',
              url: (data as any).filesUrl[0],
            },
          ]
        }
      })
    },
    beforeUpload: (file) => {
      const fileTypes = [
        'image/jpg',
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/wbmp',
        'image/webp',
      ]
      if (!fileTypes.some((item) => item === file.type)) {
        MessageError('图片格式不正确')
        return false
      } else if (file.size / 1024 / 1024 > 2) {
        MessageError('图片大小不得超过 2MB!')
        return false
      }
      return true
    },
    onRemove: () => {
      userFormData.value.avatar = []
    },
    onPreview: (file) => {
      previewVisible.value = true
      previewImageUrl.value = file
    },
  },
  {
    component: 'Input',
    label: '备注',
    prop: 'remark',
    width: '550px',
  },
])

export const handleSubmit = async (valid: boolean): Promise<void> => {
  if (valid) await edit(userFormData.value)
}
