<template>
  <la-table :loading="tableLoading" :data="roles" :columns="columns">
    <template #header>
      <strong>角色列表</strong>
      <el-button type="primary" icon="Plus" @click="visible = true">添加角色</el-button>
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
import { tableLoading, roles, columns } from './hooks/useTable'
import { findMany } from './hooks/useHttp'

await findMany()
</script>
