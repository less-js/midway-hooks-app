<template>
  <la-table :loading="tableLoading" :data="dictionaries" :columns="columns">
    <template #header>
      <strong>枚举字典列表</strong>
      <el-button type="primary" icon="Plus" @click="visible = true">添加枚举字典</el-button>
    </template>
  </la-table>
  <el-dialog
    width="876px"
    top="10vh"
    v-model="visible"
    :title="useTitle(formData?.id)"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="handleBeforeClose"
  >
    <el-form
      ref="formRef"
      label-width="auto"
      label-position="top"
      :inline="true"
      :model="formData"
      :rules="formRules"
    >
      <template v-for="item in formRows" :key="item">
        <el-form-item :label="item.label" :prop="item.prop">
          <el-input
            clearable
            v-if="item.component === 'Input'"
            v-model="formData[item.prop]"
            :style="{ width: (item as IInput).width }"
            :placeholder="item.placeholder"
          />
          <el-radio-group v-if="item.component === 'Radio'" v-model="formData[item.prop]">
            <el-radio-button
              v-for="option in (item as IRadio).options"
              :key="option"
              :label="option.label"
            >
              {{ option.value }}
            </el-radio-button>
          </el-radio-group>
          <el-select
            v-if="item.component === 'Select'"
            clearable
            v-model="formData[item.prop]"
            :disabled="isDisabled"
            :placeholder="item.placeholder"
          >
            <el-option
              v-for="option in (item as ISelect).options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
      </template>
      <el-form-item label="字典枚举元素" style="margin: 0" />
      <el-row v-for="(col, idx) in formData.enumElements" :key="col">
        <el-form-item
          :prop="'enumElements.' + idx + '.label'"
          :rules="{ required: true, message: '枚举元素展示别名不能为空', trigger: 'blur' }"
        >
          <el-input clearable v-model="col.label" placeholder="枚举元素展示别名，如 “已发布”" />
        </el-form-item>
        <el-form-item
          :prop="'enumElements.' + idx + '.value'"
          :rules="{ required: true, message: '枚举元素值不能为空', trigger: 'blur' }"
        >
          <el-input
            v-if="formData.enumElementType !== 'number'"
            clearable
            v-model="col.value"
            placeholder="枚举元素值，如 “published”"
          />
          <el-input-number
            v-else
            clearable
            v-model="col.value"
            placeholder="枚举元素值，如 “100”"
          />
        </el-form-item>
        <el-form-item :prop="'enumElements.' + idx + '.remark'">
          <el-input clearable v-model="col.remark" placeholder="枚举元素备注信息" />
        </el-form-item>
        <el-form-item :prop="'enumElements.' + idx + '.isEnable'">
          <el-switch
            width="50px"
            inline-prompt
            active-text="启用"
            inactive-text="禁用"
            v-model="col.isEnable"
          />
        </el-form-item>
        <el-form-item>
          <el-button plain icon="remove" type="danger" @click="handleRemoveEnum(idx)" />
        </el-form-item>
      </el-row>
      <el-form-item>
        <el-button icon="Plus" @click="handleAddEnum">添加枚举元素</el-button>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleSubmit(formRef)" :loading="formLoading">
          保存
        </el-button>
        <el-button type="danger" @click="handleReset(formRef)">重置</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import useTitle from '@/hooks/useTitle'
import {
  visible,
  formLoading,
  formRef,
  formRules,
  formData,
  formRows,
  isDisabled,
  handleBeforeClose,
  handleRemoveEnum,
  handleAddEnum,
  handleSubmit,
  handleReset,
} from './hooks/useForm'
import { tableLoading, dictionaries, columns } from './hooks/useTable'
import { findMany } from './hooks/useHttp'
import { IInput, IRadio, ISelect } from '@/types/form'

await findMany()
</script>

<style lang="scss" scoped>
.el-form-item:nth-child(5) {
  :deep .el-form-item__label {
    width: 124px !important;
  }
  :deep .el-select {
    width: 100%;
  }
}
:deep .el-card__header {
  display: flex;
  justify-content: space-between;
}
:deep .el-form-item {
  width: 100%;
  margin-right: 0;
  .el-button {
    width: 100%;
  }
}
.el-row {
  :deep .el-form-item {
    width: auto;
    margin-right: 20px;
    .el-input,
    .el-input-number {
      width: 220px;
    }
  }
  :deep .el-form-item:last-child {
    margin-right: 0;
  }
}
</style>
