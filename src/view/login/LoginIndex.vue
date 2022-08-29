<template>
  <div
    class="login-container flex justify-center items-center flex-col w-full h-screen bg-no-repeat bg-cover bg-blue-400"
  >
    <el-form
      class="relative sm:w-80 w-80 m-5 mb-0 pt-6 pl-6 pr-6 rounded-lg shadow-2xl bg-blue-200 bg-opacity-70"
      ref="loginForm"
      :model="ruleForm"
      :rules="rules"
    >
      <el-form-item prop="username">
        <el-input clearable v-model="ruleForm.username" placeholder="账号">
          <template #prefix>
            <el-icon class="el-input__icon">
              <user />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          show-password
          v-model="ruleForm.password"
          placeholder="密码"
          type="password"
          autocomplete="off"
        >
          <template #prefix>
            <el-icon class="el-input__icon">
              <lock />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="captcha" prop="captcha">
        <el-input clearable v-model="ruleForm.captcha" placeholder="验证码" />
        <div class="svg" @click="handleCaptcha" v-html="captcha.svg"></div>
      </el-form-item>
      <el-alert
        style="margin-bottom: 18px"
        show-icon
        type="error"
        v-if="errorMsg"
        :title="errorMsg"
        :closable="false"
      />
      <el-form-item>
        <el-button type="primary" @keydown.enter.prevent="handleSignIn" @click="handleSignIn">
          <span>登录</span>
        </el-button>
      </el-form-item>
    </el-form>
    <div class="mt-2 text-center text-gray-200 text-xs">LessJS 后台内容管理系统解决方案.</div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/userStore'
import { useMenuStore } from '@/store/menuStore'
import { getCaptcha, signIn } from '@/apis/user'
import encrypt from '@/utils/encrypt'

const router = useRouter()

const captcha = reactive({ svg: '', key: '' })
const rsa = reactive({ publicKey: '', rsaKey: '' })
const handleCaptcha = async () => {
  const { status, data } = await getCaptcha()
  if (status === 1000) {
    captcha.svg = data.captcha.svg
    captcha.key = data.captcha.captchaKey
    rsa.publicKey = data.rsa.publicKey
    rsa.rsaKey = data.rsa.rsaKey
  }
}
onMounted(() => handleCaptcha())

const loginForm = ref(null)
const ruleForm = reactive({
  username: '',
  password: '',
  captcha: '',
})
const rules = reactive({
  username: [
    {
      required: true,
      message: '请输入账号！',
      trigger: 'blur',
    },
    {
      min: 3,
      max: 12,
      message: '最小5位，最大12位！',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码！',
      trigger: 'blur',
    },
    {
      min: 6,
      max: 12,
      message: '最小6位，最大12位!',
      trigger: 'blur',
    },
  ],
  captcha: [
    {
      required: true,
      message: '请输入验证码!',
      trigger: 'blur',
    },
    {
      min: 4,
      max: 4,
      message: '请输入4位验证码！',
      trigger: 'blur',
    },
  ],
})
const errorMsg = ref()
const handleSignIn = () => {
  loginForm.value.validate(async (valid: any) => {
    if (valid) {
      const { status, data, message } = await signIn({
        username: ruleForm.username,
        password: encrypt(rsa.rsaKey, rsa.publicKey, ruleForm.password),
        captchaKey: captcha.key,
        captcha: ruleForm.captcha,
      })
      if (status === 1000) {
        const { token, user } = data
        useUserStore().setUserInfo(token, user)
        await useMenuStore().fetchPermissionMenus()
        useMenuStore().dynamicAddRoutes(router)
        router.push('/dashboard')
      } else {
        handleCaptcha()
        Object.keys(message).length === 0
          ? (errorMsg.value = '验证码错误！')
          : (errorMsg.value = message)
      }
    }
  })
}
</script>

<style lang="scss" scoped>
@import url('./style.scss');
</style>
