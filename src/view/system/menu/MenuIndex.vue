<template>
  <el-card class="mb-5">
    <la-form
      ref="searchFormRef"
      :formRows="searchFormRows"
      :model="searchFormData"
      :rules="searchFormRules"
      :inline="true"
      labelWidth="auto"
      @on-event="handleSearch"
    />
  </el-card>
  <la-table :loading="tableLoading" :data="menus" :columns="columns" @on-event="handleRowEdit">
    <template #header>
      <strong>菜单列表</strong>
      <el-button type="primary" icon="Plus" @click="visible = true">添加菜单</el-button>
    </template>
  </la-table>
  <la-dialog-form
    width="690px"
    labelWidth="auto"
    :loading="formLoading"
    :inline="true"
    v-model="visible"
    v-model:formData="formData"
    :formRows="formRows"
    :formRules="formRules"
    @on-event="handleSubmit"
  >
    <template #icon>
      <la-icon-picker v-model="formData.icon" />
    </template>
    <template #test>
      <el-input type="text" placeholder="test" />
    </template>
  </la-dialog-form>
</template>
<script lang="ts" setup>
import { useFetchRoles, useFetchDepartments } from '@/hooks/useFetch'
import {
  visible,
  formLoading,
  formData,
  formRows,
  formRules,
  handleSubmit,
  roles,
  departments,
} from './hooks/useForm'
import { tableLoading, menus, columns, handleRowEdit } from './hooks/useTable'
import { searchFormRows, searchFormData, searchFormRules, handleSearch } from './hooks/useSearch'
import { findMany } from './hooks/useHttp'

await findMany()
roles.value = await useFetchRoles()
departments.value = await useFetchDepartments()
</script>

<style lang="scss" scoped>
:deep .el-card__body:nth-child(1) {
  padding-bottom: 0;
}
</style>
