<template>
  <template v-for="(col, index) in props.columns" :key="index">
    <Item v-if="!col.children" :item="col" @on-event="handleEvent" />
    <template v-else>
      <el-table-column :label="col.label" :align="col.align || 'center'">
        <Column :columns="col.children" @on-event="handleEvent" />
      </el-table-column>
    </template>
  </template>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineEmits } from 'vue'
import Item from './Item.vue'
import { IColumns } from '../../types/table'

export interface Props {
  columns: IColumns[]
}

const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
})
let emits = defineEmits<{
  (e: 'on-event', row: object): void
}>()

const handleEvent = (row) => {
  emits('on-event', row)
}
</script>

<style scoped lang="scss"></style>
