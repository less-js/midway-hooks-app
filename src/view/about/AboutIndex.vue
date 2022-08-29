<template>
  <el-card>
    <span class="font-medium text-lg">关于</span>
    <p class="text-slate-500 text-sm">
      Less Admin 是一个基于 Midway Hooks、Vue3.2、Vite、Element-plus、TypeScript
      的一体化全栈开发的后台管理系统，提供即开即用的解决方案。
    </p>
  </el-card>
  <el-card class="mt-5">
    <el-descriptions title="系统信息" border :column="2">
      <el-descriptions-item label="项目名称">
        <el-tag size="small">{{ info.midwayInformationService.pkg.name }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="版本">
        <el-tag size="small">{{ info.midwayInformationService.pkg.version }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="文档地址">
        <a href="https://lessjs.com" target="_blank">文档地址</a>
      </el-descriptions-item>
      <el-descriptions-item label="预览地址">
        <a href="https://demo.lessjs.com" target="_blank">预览地址</a>
      </el-descriptions-item>
      <el-descriptions-item label="Github">
        <a href="https://github.com" target="_blank">Github</a>
      </el-descriptions-item>
      <el-descriptions-item label="Gitee">
        <a href="https://gitee.com" target="_blank">Gitee</a>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
  <el-card class="mt-5">
    <el-descriptions title="相关命令" border :column="2">
      <el-descriptions-item
        v-for="(value, name) of info.midwayInformationService.pkg.scripts"
        :key="name"
        :label="name"
      >
        {{ value }}
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
  <el-card class="mt-5">
    <el-descriptions title="生产环境依赖" border>
      <el-descriptions-item
        v-for="(value, name) of info.midwayInformationService.pkg.dependencies"
        :key="name"
        :label="name"
      >
        {{ value }}
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
  <el-card class="mt-5">
    <el-descriptions title="开发环境依赖" border>
      <el-descriptions-item
        v-for="(value, name) of info.midwayInformationService.pkg.devDependencies"
        :key="name"
        :label="name"
      >
        {{ value }}
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getSystemInfo } from '@/apis/systemInfo'

const info = ref()
const { data, status } = await getSystemInfo()
if (status === 1000) {
  info.value = data
}
</script>

<style scoped></style>
