<template>
  <el-card shadow="hover" class="item mb-4 mr-4">
    <div class="content">
      <el-icon
        v-if="Object.keys(fieldTypeMap).length > 0"
        class="icon"
        size="30px"
        :style="{ color: element.isSystem ? '#f89898' : '#79bbff' }"
      >
        <component :is="fieldTypeMap[element.type].icon" />
      </el-icon>
      <div class="info">
        <div class="title">
          <span> {{ element.displayName }} </span>
          <em># {{ element.name }} </em>
          <el-tooltip
            effect="dark"
            placement="top"
            v-if="element.description"
            :content="element.description"
          >
            <el-icon color="#409EFF"><WarningFilled /></el-icon>
          </el-tooltip>
        </div>
        <p>
          <el-tag
            v-if="Object.keys(fieldTypeMap).length > 0"
            class="mr-2"
            type="info"
            :effect="'light'"
          >
            {{ fieldTypeMap[element.type].label }}
          </el-tag>
          <el-tag v-if="element.isSystem">系统字段</el-tag>
        </p>
      </div>
    </div>
    <el-button-group v-if="!element.isSystem">
      <el-button icon="Edit" type="primary" @click="handleEditField(element)">编辑</el-button>
      <el-button icon="Delete" type="danger" @click="handleDeleteField(element)">删除</el-button>
    </el-button-group>
  </el-card>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, computed } from 'vue'
import { ConfirmBox } from '@/utils/message'
import { fieldTypeMap } from '../hooks/useFieldTypes'
import { IField } from '@/types/model'

interface Props {
  element: IField
}
const props = withDefaults(defineProps<Props>(), {})
const emits = defineEmits<{
  (e: 'update:modelValue', val: IField): void
  (e: 'on-edit-field', val: IField): void
  (e: 'on-delete-field', val: IField): void
}>()

const element = computed({
  get: () => props.element,
  set: (val): void => emits('update:modelValue', val),
})

const handleEditField = (row: IField) => emits('on-edit-field', row)
const handleDeleteField = (row: IField) => {
  ConfirmBox(`确定删除 ${row.displayName} ?`)
    .then(() => emits('on-delete-field', row))
    .catch(() => {})
}
</script>
