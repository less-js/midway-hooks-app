<template>
  <el-card>
    <template #header>个人信息修改</template>
    <la-form
      ref="formRef"
      :loading="loading"
      :formRows="formRows"
      :model="personForm"
      :rules="rules"
      @on-event="handleUpdate"
    />
  </el-card>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '@/store/userStore'
import { uploadImage } from '@/apis/upload'
import { updatePerson, getRsaKey } from '@/apis/user'
import { filterParams } from '@/utils/common'
import encrypt from '@/utils/encrypt'
import { IPerson } from '@/types/user'
import { MessageError, MessageSuccess } from '@/utils/message'

const loading = ref(false)

const rsa = reactive({
  publicKey: '',
  rsaKey: '',
})
const rsaResult = await getRsaKey()
if (rsaResult.status === 1000) {
  rsa.publicKey = rsaResult.data.publicKey
  rsa.rsaKey = rsaResult.data.rsaKey
}

const userStore = useUserStore()

const dialogVisible = ref(false)
const dialogImageUrl = ref(null)

const formRef = ref()
const checkUsername = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('请输入登录账号'))
  } else if (value && !/^[a-zA-Z][a-zA-Z\d]{2,8}$/.test(value)) {
    callback(new Error('账号只能使用字母开头，不得小于 3 个字符且不得大于 8 个字符'))
  } else {
    callback()
  }
}
const checkPhone = (rule: any, value: any, callback: any) => {
  if (value && !/^1[34578]\d{9}$/.test(value)) {
    callback(new Error('请输入正确的手机号'))
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
const checkPass = (rule: any, value: any, callback: any) => {
  if (value) {
    if (value.length < 6 || value.length > 16) {
      callback(new Error('密码不得小于 6 位，且不得大于 16 位'))
      if (personForm.checkPass !== '') {
        if (!formRef.value) return
        formRef.value.validateField('checkPass', () => null)
      }
    }
    callback()
  } else {
    callback()
  }
}
const checkPass2 = (rule: any, value: any, callback: any) => {
  if (personForm.newPassword !== '' && value === '') {
    callback(new Error('请再次输入新密码'))
  } else if (value !== personForm.newPassword) {
    callback(new Error('2 次密码不匹配'))
  } else {
    callback()
  }
}
const rules = reactive({
  username: [{ validator: checkUsername, trigger: 'blur' }],
  password: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
    { min: 6, max: 16, message: '密码不得小于 6 个字符且不得大于 30 个字符', trigger: 'blur' },
  ],
  newPassword: [{ validator: checkPass, trigger: 'blur' }],
  checkPass: [{ validator: checkPass2, trigger: 'blur' }],
  phone: [{ validator: checkPhone, trigger: 'blur' }],
  email: [{ validator: checkEmail, trigger: 'blur' }],
})

const { id, username, name, nickname, phone, email, avatar, remark } = userStore.getUserInfo
let personForm = reactive<IPerson>({
  id,
  username,
  name,
  nickname,
  password: '',
  newPassword: '',
  checkPass: '',
  phone,
  email,
  avatar: [
    {
      name,
      url: avatar as string,
    },
  ],
  remark,
})
const formRows = [
  {
    component: 'Input',
    label: '登录账号',
    prop: 'username',
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
    label: '旧密码',
    type: 'password',
    prop: 'password',
  },
  {
    component: 'Input',
    label: '新密码',
    type: 'password',
    prop: 'newPassword',
  },
  {
    component: 'Input',
    label: '新密码确认',
    placeholder: '请再次输入新密码',
    type: 'password',
    prop: 'checkPass',
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
          personForm.avatar = [
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
      personForm.avatar = []
    },
    onPreview: (file) => {
      dialogVisible.value = true
      dialogImageUrl.value = file
    },
  },
  {
    component: 'Input',
    label: '备注',
    prop: 'remark',
    type: 'textarea',
    width: '550px',
  },
  {
    component: 'Button',
    buttons: [
      {
        value: '保存',
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

const handleUpdate = async (params) => {
  if (!params.data && params.valid) {
    loading.value = true
    delete personForm.checkPass
    personForm.password = personForm.password
      ? encrypt(rsa.rsaKey, rsa.publicKey, personForm.password)
      : ''
    personForm.newPassword = personForm.newPassword
      ? encrypt(rsa.rsaKey, rsa.publicKey, personForm.newPassword)
      : ''
    const avatar = personForm.avatar.length ? personForm.avatar[0]['url'] : null

    const { status, data } = await updatePerson({ ...filterParams(personForm), avatar })
    if (status === 1000) {
      loading.value = false
      const { token, userInfo } = data
      personForm.password = ''
      personForm.newPassword = ''
      personForm.checkPass = ''
      useUserStore().setUserInfo(token, userInfo)
      MessageSuccess('更新完成')
    } else {
      MessageError('更新失败')
    }
  }
}
</script>
