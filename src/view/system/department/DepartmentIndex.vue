<template>
  <la-table :loading="tableLoading" :data="departments" :columns="columns">
    <template #header>
      <strong>部门列表</strong>
      <el-button type="primary" icon="Plus" @click="visible = true">添加部门</el-button>
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
import { formLoading, visible, formData, formRows, formRules, handleSubmit } from './hooks/useForm'
import { tableLoading, departments, columns } from './hooks/useTable'
import { findMany } from './hooks/useHttp'

await findMany()
</script>
