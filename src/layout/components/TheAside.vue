<template>
  <h2 class="logo">
    <router-link to="/">
      <span v-if="!props.isCollapse"> Less Admin </span>
      <span v-else>LA</span>
    </router-link>
  </h2>
  <el-scrollbar height="calc(100vh - 50px)" always>
    <el-menu
      class="menu"
      active-text-color="#ffd04b"
      background-color="#001529"
      text-color="#fff"
      :collapse="props.isCollapse"
      :default-active="activeRouteName"
      @select="handleSelect"
    >
      <TheMenu :data="menuData" />
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, defineProps, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TheMenu from './TheMenu.vue'
import { useMenuStore } from '@/store/menuStore'

const route = useRoute()
const router = useRouter()

const props = defineProps<{
  isCollapse?: boolean
}>()

const activeRouteName = ref()
watchEffect(() => {
  activeRouteName.value = route.path.split('/').pop()
})

let menuData = ref([])
menuData.value = router.getRoutes().find((route) => route.name === 'Home').children
const menuStore = useMenuStore()
watch(
  () => menuStore.getMenuList,
  () => {
    useMenuStore().dynamicAddRoutes(router)
    menuData.value = router.getRoutes().find((route) => route.name === 'Home').children
  }
)

const handleSelect = (key: string, keyPath: string[]) => {
  const path = '/' + keyPath.join('/')
  if (key.indexOf('http') === -1) {
    router.push({ path })
  } else {
    location.href = key // window.open(key)
  }
}
</script>
