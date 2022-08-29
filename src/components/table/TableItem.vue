<template>
  <el-table-column
    :type="data.item.type"
    :prop="data.item.prop"
    :sortable="data.item.sortable"
    :label="data.item.label"
    :width="data.item.width"
    :min-width="data.item.minWidth"
    :align="data.item.align"
    :header-align="data.item.headAlign"
    :fixed="data.item.fixed"
    :class-name="data.item.className"
  >
    <template v-if="data.item.slots" #default="scope">
      <!-- <template v-if="data.item.slots === 'tag'">
        <el-tag :type="data.item.props?.type">{{ scope.row[data.item.prop] }}</el-tag>
      </template> -->
      <template v-if="data.item.slots === 'html'">
        <div v-html="scope.row[data.item.prop]"></div>
      </template>
      <template v-if="data.item.slots === 'icon' && scope.row[data.item.prop]">
        <el-icon :size="(data.item.props?.size && data.item.props?.size + 'px') || '18px'">
          <component :is="scope.row[data.item.prop]" />
        </el-icon>
      </template>
      <template v-else-if="data.item.slots === 'image' && scope.row[data.item.prop]">
        <el-image
          :style="{ width: compWidth(data.item.props), height: compHeight(data.item.props) }"
          :src="scope.row[data.item.prop]"
          :fit="data.item.props.fit"
        />
      </template>
      <template v-else-if="data.item.slots === 'input'">
        <el-input
          v-model="scope.row[data.item.prop]"
          placeholder="Please input"
          @blur="handleEvent(scope.row)"
        />
      </template>
      <template v-else-if="data.item.slots === 'inputNumber'">
        <el-input-number
          v-model="scope.row[data.item.prop]"
          :min="1"
          :max="99999"
          @change="handleEvent(scope.row)"
        />
      </template>
      <template v-else-if="data.item.slots && data.item.slots === 'switch'">
        <el-switch
          v-model="scope.row[data.item.prop]"
          :inline-prompt="true"
          :width="compWidth(data.item.props)"
          :disabled="compDisabled(data.item.props)"
          :size="compSize(data.item.props)"
          :active-text="compActiveText(data.item.props)"
          :inactive-text="compInActiveText(data.item.props)"
          @change="handleEvent(scope.row, data.item.prop)"
        />
      </template>
      <template v-else-if="data.item.slots && data.item.slots === 'select'">
        <el-select
          placeholder="Select"
          v-model="scope.row[data.item.prop]"
          :multiple="compMultiple(data.item.props)"
          @change="handleEvent(scope.row)"
        >
          <el-option
            v-for="option in data.item.props.options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </template>
      <template v-else-if="data.item.slots && data.item.slots === 'button'">
        <template v-for="(btn, idx) in data.item.options" :key="idx">
          <el-button
            v-if="!btn.name"
            circle
            :type="btn.type"
            :icon="btn.icon"
            @click="btn.method(scope.row, scope.$index)"
          />
          <el-button
            v-else
            :type="btn.type"
            :icon="btn.icon"
            @click="btn.method(scope.row, scope.$index)"
          >
            {{ btn.name }}
          </el-button>
        </template>
      </template>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, computed } from 'vue'
import { IColumns } from '../../types/table'

export interface Props {
  item: IColumns
}

const data = withDefaults(defineProps<Props>(), {
  item: (): IColumns => ({
    prop: '',
    label: '',
  }),
})
let emits = defineEmits<{
  (e: 'on-event', row: object, prop?): void
}>()

const compMultiple = computed(() => (val) => val?.multiple)
const compWidth = computed(() => (val) => val?.width)
const compHeight = computed(() => (val) => val?.height)
const compDisabled = computed(() => (val) => val?.disabled)
const compSize = computed(() => (val) => val?.size)
const compActiveText = computed(
  () => (val) =>
    !val || !val.activeText || val.activeText === 1 || val.activeText === '1'
      ? '是'
      : val.activeText
)
const compInActiveText = computed(
  () => (val) =>
    !val || !val.inActiveText || val.inActiveText === 0 || val.inActiveText === '0'
      ? '否'
      : val.inActiveText
)

const handleEvent = (row, prop?) => {
  emits('on-event', row, prop)
}
</script>
