<template>
  <la-table :loading="tableLoading" :data="categories" :columns="columns">
    <template #header>
      <strong>栏目分类列表</strong>
      <el-button type="primary" icon="Plus" @click="visible = true">添加栏目分类</el-button>
    </template>
  </la-table>
  <la-dialog-form
    :loading="formLoading"
    v-model="visible"
    v-model:formData="formData"
    :formRows="formRows"
    :formRules="formRules"
    @on-event="handleSubmit"
  />
</template>

<script setup lang="ts">
import { visible, formLoading, formData, formRows, formRules, handleSubmit } from './hooks/useForm'
import { tableLoading, categories, columns } from './hooks/useTable'
import { findMany, fetchModels } from './hooks/useHttp'

await findMany()
await fetchModels()
</script>
