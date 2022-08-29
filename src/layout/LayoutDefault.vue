<template>
  <el-container>
    <el-aside :style="{ width: asideWidth }">
      <Aside :isCollapse="isCollapse" />
    </el-aside>
    <el-container :style="{ 'margin-left': asideWidth }">
      <el-header :style="{ width: `calc(100% - ${asideWidth})` }">
        <Header :isCollapse="isCollapse" @on-collapse-aside="handleCollapseAside" />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Header from './components/TheHeader.vue'
import Aside from './components/TheAside.vue'
import Footer from './components/TheFooter.vue'

const isCollapse = ref(false)
const asideWidth = computed(() => (!isCollapse.value ? 220 + 'px' : 64 + 'px'))
const handleCollapseAside = (val) => (isCollapse.value = val)
</script>

<style scoped lang="scss">
.el-aside {
  position: fixed;
  height: 100vh;
  overflow: hidden;
  background-color: #001529;
  color: #cacaca;
  transition: width 0.3s;
  :deep .el-menu {
    border: none !important;
  }
}
.el-container {
  min-height: 100vh;
}
.el-container:nth-child(2) {
  transition: width 0.3s;
}
.el-header {
  position: fixed;
  right: 0;
  top: 0;
  background-color: #fff;
  height: 50px;
  padding: 0;
  z-index: 999;
}

.el-main {
  padding: 0;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 90px;
}

.el-footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
