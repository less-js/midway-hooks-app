<template>
  <template v-for="item in props.data" :key="item.path">
    <template v-if="!item.meta.hidden">
      <el-menu-item v-if="!item.children" :index="item.path">
        <el-icon><component v-if="item.meta.icon" :is="item.meta.icon" /></el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
      <template v-else>
        <el-sub-menu :index="item.path">
          <template #title>
            <el-icon><component v-if="item.meta.icon" :is="item.meta.icon" /></el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
          <TheMenu :data="item.children" />
        </el-sub-menu>
      </template>
    </template>
  </template>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
import { RouteRecordRaw } from 'vue-router'

interface Props {
  data: Array<RouteRecordRaw>
}
const props = withDefaults(defineProps<Props>(), {
  data: () => [],
})
</script>
