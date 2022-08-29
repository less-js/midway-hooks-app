<template>
  <la-table :loading="tableLoading" :data="users" :columns="columns" @on-event="handleRowEdit">
    <template #header>
      <strong>用户列表</strong>
      <el-button type="primary" icon="Plus" @click="visible = true">添加用户</el-button>
    </template>
  </la-table>
  <la-dialog-form
    top="2vh"
    width="660px"
    :loading="formLoading"
    v-model="visible"
    v-model:formData="userFormData"
    :formRows="formRows"
    :formRules="formRules"
    @on-event="handleSubmit"
  />
</template>

<script setup lang="ts">
import { useFetchRoles, useFetchDepartments } from '@/hooks/useFetch'
import {
  visible,
  formLoading,
  userFormData,
  formRows,
  formRules,
  roles,
  departments,
  handleSubmit,
} from './hooks/useForm'
import { tableLoading, users, columns, handleRowEdit } from './hooks/useTable'
import { findMany } from './hooks/useHttp'

await findMany()
roles.value = await useFetchRoles()
departments.value = await useFetchDepartments()
</script>
