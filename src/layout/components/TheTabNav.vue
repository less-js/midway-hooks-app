<template>
  <div class="nav-tab">
    <el-icon class="arrow" @click="handleScroll(200)"><arrow-left /></el-icon>
    <div
      class="scrollbar"
      ref="scrollBarRef"
      @DOMMouseScroll="handleRolling"
      @mousewheel="handleRolling"
    >
      <ul
        class="scroll-content"
        ref="scrollContentRef"
        :style="{ transform: `translateX(${translateX}px)` }"
      >
        <li
          class="item"
          :ref="tabNavLiRef"
          v-for="(item, index) in navigators"
          :key="item.meta.title"
        >
          <router-link :to="item.path">
            {{ item.meta.title }}
          </router-link>
          <el-icon v-if="item.name !== 'Dashboard'" @click="handleCloseTab(item.name, index)">
            <close />
          </el-icon>
        </li>
      </ul>
    </div>
    <el-icon class="arrow" @click="handleScroll(-200)">
      <arrow-right />
    </el-icon>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <el-icon><more-filled /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="left">
            <el-icon><back /></el-icon>
            关闭左侧
          </el-dropdown-item>
          <el-dropdown-item command="right">
            <el-icon><right /></el-icon>
            关闭右侧
          </el-dropdown-item>
          <el-dropdown-item command="other">
            <el-icon><close /></el-icon>
            关闭其它
          </el-dropdown-item>
          <el-dropdown-item command="all">
            <el-icon><remove /></el-icon>
            关闭所有
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, nextTick, onBeforeUpdate } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useNavTabsStore } from '@/store/navTabsStore'

const route = useRoute()
const router = useRouter()
const navTabsStore = useNavTabsStore()

const navigators = computed(() => navTabsStore.navigators)
const currentRouteIndex = computed((): number =>
  navigators.value.findIndex((item) => item.name === route.name)
)
watch(
  () => route.name,
  () => {
    navTabsStore.addNavTabs(route)
    nextTick(() => moveTabToView(currentRouteIndex.value))
  },
  { immediate: true }
)

const scrollBarRef = ref<HTMLDivElement>()
const scrollContentRef = ref<HTMLDivElement>()
let translateX = ref<number>(0)
const barContentWidth = () => ({
  barWidth: scrollBarRef.value ? scrollBarRef.value.offsetWidth : 0,
  contentWidth: scrollContentRef.value ? scrollContentRef.value.offsetWidth : 0,
})

// 设置 tabItem 位置
let tabNavLiRefs: any = []
const tabNavLiRef = (el: any): void => tabNavLiRefs.push(el)
onBeforeUpdate(() => (tabNavLiRefs = []))
const tabNavPadding = 10
const moveTabToView = (index: number): void => {
  if (!tabNavLiRefs[index]) return
  const { offsetLeft, offsetWidth } = tabNavLiRefs[index]
  const { barWidth, contentWidth } = barContentWidth()
  if (contentWidth < barWidth || offsetLeft === 0) {
    translateX.value = 0
  } else if (offsetLeft < -translateX.value) {
    // 标签在可视区域左侧
    translateX.value = -offsetLeft + tabNavPadding
  } else if (
    offsetLeft > -translateX.value &&
    offsetLeft + offsetWidth < -translateX.value + barWidth
  ) {
    // 标签在可视区域
    translateX.value = Math.min(0, barWidth - offsetWidth - offsetLeft - tabNavPadding)
  } else {
    // 标签在可视区域右侧
    translateX.value = -(offsetLeft - (barWidth - tabNavPadding - offsetWidth))
  }
}

// tab 滚动
const handleScroll = (offset: number): void => {
  if (offset > 0) {
    translateX.value = Math.min(0, translateX.value + offset)
  } else {
    const { barWidth, contentWidth } = barContentWidth()
    if (barWidth < contentWidth) {
      if (translateX.value >= -(contentWidth - barWidth)) {
        translateX.value = Math.max(translateX.value + offset, barWidth - contentWidth)
      }
    } else {
      translateX.value = 0
    }
  }
}
const handleRolling = (e: any): void => {
  const type = e.type
  let delta = 0
  if (type === 'DOMMouseScroll' || type === 'mousewheel') {
    delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40
  }
  handleScroll(delta)
}

// 关闭 tab
const handleCloseTab = (routeName: string, idx: number): void => {
  const { path } = idx - 1 >= 0 ? navigators.value[idx - 1] : navigators.value[idx + 1]
  navTabsStore.closeNavTab(idx)
  if (route.name === routeName) router.push({ path })
}
const handleCommand = (command: string): void => {
  navTabsStore.closeNavTab(currentRouteIndex.value, command)
  moveTabToView(currentRouteIndex.value)
  if (command === 'all') router.push({ path: '/' })
}
</script>
