<template>
  <div class="header">
    <div class="breadcrumb">
      <el-icon class="collapse" @click="handleCollapseAside">
        <expand v-if="props.isCollapse" />
        <fold v-else />
      </el-icon>
      <el-breadcrumb separator="/">
        <template v-for="item in breadcrumbs" :key="item.name">
          <el-breadcrumb-item :to="{ path: item.path }">
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="24" :src="userInfo.avatar" />
        <span>{{ userInfo.name || userInfo.nickname || userInfo.username }}</span>
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <router-link to="/person">个人信息</router-link>
          </el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item @click="handleSignOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <NavTab />
</template>

<script setup lang="ts">
import { reactive, watchEffect, defineProps, defineEmits } from 'vue'
import { useRouter, useRoute, RouteLocationMatched } from 'vue-router'
import { useNavTabsStore } from '@/store/navTabsStore'
import { useUserStore } from '@/store/userStore'
import { useMenuStore } from '@/store/menuStore'
import NavTab from './TheTabNav.vue'

const props = defineProps<{
  isCollapse?: boolean
}>()
let emits = defineEmits<{ (e: 'on-collapse-aside', isCollapse: boolean): void }>()
const handleCollapseAside = () => {
  emits('on-collapse-aside', !props.isCollapse)
}

const route = useRoute()
const router = useRouter()

const breadcrumbs = reactive<RouteLocationMatched[]>([])
watchEffect(() => {
  if (breadcrumbs.length > 0) breadcrumbs.length = 0
  route.matched.forEach((item) => breadcrumbs.push(item))
})

const userStore = useUserStore()
let userInfo = reactive({ name: '', username: '', nickname: '', avatar: '' })
const updateUserInfo = () => {
  const { name, username, nickname, avatar } = userStore.getUserInfo
  userInfo.name = name
  userInfo.nickname = nickname
  userInfo.username = username
  userInfo.avatar = avatar as string
}
updateUserInfo()
watchEffect(() => {
  if (userStore.token) updateUserInfo()
})

const handleSignOut = () => {
  userInfo.username = ''
  userStore.clearUserInfo()
  useNavTabsStore().clearNav()
  useMenuStore().clearMenuList()
  router.push('/login')
}
</script>
