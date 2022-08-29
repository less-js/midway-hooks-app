<template>
  <el-card>
    <el-row justify="space-between" class="mb-4 items-center">
      <slot name="header"></slot>
    </el-row>
    <el-table
      v-loading="loading"
      :empty-text="emptyText"
      :max-height="maxHeight"
      :row-key="rowkey"
      :border="border"
      :stripe="stripe"
      :fit="fit"
      :highlight-current-row="highlightCurrentRow"
      :default-expand-all="defaultExpandAll"
      :data="props.data"
      @selection-change="handleSelectionChange"
    >
      <!-- <Column :columns="columns" @on-event="handleEvent" /> -->
      <template v-for="(col, index) in columns" :key="index">
        <template v-if="col.children">
          <el-table-column :label="col.label" :align="col.align || 'center'">
            <template v-for="(item, i) in col.children" :key="i">
              <Item :item="item" @on-event="handleEvent" />
            </template>
          </el-table-column>
        </template>
        <Item v-else :item="col" @on-event="handleEvent" />
      </template>
    </el-table>
    <el-row justify="space-between" class="items-center">
      <slot name="footer"></slot>
    </el-row>
    <el-row v-if="pageTotal && pageTotal > 0" justify="center" class="items-center">
      <el-pagination
        background
        v-model:currentPage="newCurrentPage"
        v-model:page-size="newPageSize"
        layout="prev, pager, next, jumper"
        :total="pageTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, computed } from 'vue'
// import Column from './Column.vue'
import Item from './TableItem.vue'
import { IColumns } from '../../types/table'

export interface Props {
  data: []
  columns: IColumns[]
  loading?: boolean
  emptyText?: string
  maxHeight?: number | string
  border?: boolean
  stripe?: boolean
  fit?: boolean
  highlightCurrentRow?: boolean
  defaultExpandAll?: boolean
  rowkey?: string
  pageTotal?: number
  currentPage?: number
  pageSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  columns: () => [],
  loading: false,
  emptyText: '暂无数据',
  maxHeight: 'auto',
  border: true,
  stripe: true,
  fit: true,
  highlightCurrentRow: true,
  defaultExpandAll: true,
  rowkey: 'id',
  pageTotal: 0,
  currentPage: 0,
  pageSize: 0,
})
let emits = defineEmits<{
  (e: 'selection-change', val: []): void
  (e: 'size-change', val: number): void
  (e: 'current-change', val: number): void
  (e: 'update:currentPage', val: number): void
  (e: 'update:pageSize', val: number): void
  (e: 'on-event', row: object, prop?): void
}>()

const handleSelectionChange = (val: []): void => emits('selection-change', val)
const handleSizeChange = (val: number): void => emits('size-change', val)
const handleCurrentChange = (val: number): void => emits('current-change', val)

const newCurrentPage = computed({
  get: () => props.currentPage,
  set: (val) => {
    emits('update:currentPage', val)
  },
})
const newPageSize = computed({
  get: () => props.pageSize,
  set: (val) => {
    emits('update:pageSize', val)
  },
})

const handleEvent = (row, prop?) => {
  emits('on-event', row, prop)
}
</script>
