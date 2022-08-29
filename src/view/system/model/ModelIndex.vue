<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>模型管理</span>
        <el-button icon="Plus" type="primary" @click="modelFormVisible = true">添加模型</el-button>
      </div>
    </template>
    <el-empty description="暂无模型" v-if="!modelList.length" style="width: calc(100vw - 500px)" />
    <el-tabs
      v-else
      tab-position="left"
      class="tabs"
      v-loading="modelListLoading"
      v-model="tabActiveIndex"
    >
      <el-tab-pane v-for="item in modelList" :key="item.id">
        <template #label>{{ item.name }}</template>
        <el-main class="filed-list ml-5">
          <el-row class="header mr-4">
            <h3>
              {{ item.name }}
            </h3>
            <el-button-group size="small">
              <el-button icon="Edit" type="primary" @click="handleEditModel(item)">
                编辑
              </el-button>
              <el-button icon="DocumentCopy" type="warning" @click="handleCopyModel(item)">
                复制
              </el-button>
              <el-button icon="Delete" type="danger" @click="handleDeleteModel(item)">
                删除
              </el-button>
            </el-button-group>
          </el-row>
          <el-row class="mr-4"><el-divider /></el-row>
          <el-row class="tips mb-4 mr-4">
            <el-switch
              v-model="hiddenSystemField"
              inline-prompt
              active-text="是"
              inactive-text="否"
            />
            <span>展示系统功能性字段</span>
            <el-tooltip
              effect="dark"
              placement="top"
              content="系统功能性字段为系统功能相关的字段，请谨慎操作"
            >
              <el-icon color="#409EFF" size="18px"><QuestionFilled /></el-icon>
            </el-tooltip>
          </el-row>
          <el-scrollbar always height="calc(100vh - 425px)">
            <Sortable
              class="sortable"
              :list="item.fields"
              item-key="id"
              :options="sortablejsOptions"
              @update="handleUpdateSort"
            >
              <template #item="{ element, index }">
                <el-row v-if="element.isSystem" v-show="hiddenSystemField">
                  <FieldList v-model:element="item.fields[index]" />
                </el-row>
                <el-row class="draggable" :key="element.id" v-else>
                  <FieldList
                    v-model:element="item.fields[index]"
                    @on-edit-field="handleEditField(element)"
                    @on-delete-field="handleDeleteField(element)"
                  />
                </el-row>
              </template>
            </Sortable>
          </el-scrollbar>
        </el-main>
      </el-tab-pane>
    </el-tabs>

    <el-card class="content-type">
      <template #header><h3>字段类型</h3></template>
      <el-scrollbar v-if="fieldTypes.length" height="calc(100vh - 385px)" always>
        <el-button
          v-for="item in fieldTypes"
          :key="item.value"
          :icon="item.icon"
          size="large"
          @click="handleEditField(item)"
        >
          {{ item.label }}
        </el-button>
      </el-scrollbar>
    </el-card>
  </el-card>

  <la-dialog-form
    labelWidth="auto"
    :loading="modelFormLoading"
    :title="modelFormTitle"
    v-model="modelFormVisible"
    v-model:formData="modelFormData"
    :formRows="modelFormRows"
    :formRules="modelFormRules"
    @on-event="handleModelSubmit"
    @on-close="handleCloseDialog"
  />
  <la-dialog-form
    labelWidth="auto"
    :loading="fieldFormLoading"
    :title="fieldFormTitle"
    v-model="fieldFormVisible"
    v-model:formData="fieldFormData"
    :formRows="fieldFormRows"
    :formRules="fieldFormRules"
    @on-event="handleFieldSubmit"
  />
</template>

<script setup lang="ts">
import { Sortable } from 'sortablejs-vue3'
import FieldList from './components/FieldList.vue'
import {
  sortablejsOptions,
  modelListLoading,
  tabActiveIndex,
  hiddenSystemField,
  modelList,
  handleUpdateSort,
  handleDeleteModel,
} from './hooks/useModelList'
import {
  modelFormTitle,
  modelFormLoading,
  modelFormVisible,
  modelFormData,
  modelFormRows,
  modelFormRules,
  handleEditModel,
  handleCopyModel,
  handleModelSubmit,
  handleCloseDialog,
} from './hooks/useModelForm'
import { fieldTypes, handleDeleteField, handleEditField } from './hooks/useFieldTypes'
import {
  fieldFormTitle,
  fieldFormLoading,
  fieldFormVisible,
  fieldFormData,
  fieldFormRows,
  fieldFormRules,
  handleFieldSubmit,
} from './hooks/useFieldForm'
import { findMany, findFieldTypes } from './hooks/useHttp'

await findMany()
await findFieldTypes()
</script>

<style lang="scss" scoped>
@import url('./style/model.scss');
</style>
