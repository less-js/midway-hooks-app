<template>
  <el-time-picker
    v-model="data"
    :placeholder="attrs.placeholder"
    :readonly="attrs.readonly"
    :disabled="attrs.disabled"
    :editable="attrs.editable"
    :clearable="attrs.clearable"
    :size="attrs.size"
    :start-placeholder="attrs.startPlaceholder"
    :end-placeholder="attrs.endPlaceholder"
    :is-range="attrs.isRange"
    :arrow-control="attrs.arrowControl"
    :align="attrs.align"
    :popper-class="attrs.popperClass"
    :range-separator="attrs.rangeSeparator"
    :format="attrs.format"
    :default-value="attrs.defaultValue"
    :prefix-icon="attrs.prefixIcon"
    :clear-icon="attrs.clearIcon"
    :disabled-hours="attrs.disabledHours"
    :disabled-minutes="attrs.disabledMinutes"
    :disabled-seconds="attrs.disabledSeconds"
    :teleported="false"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, computed, reactive } from 'vue'
import { ITimePicker } from '@/types/form'

interface Props {
  attributes: ITimePicker
  formData: object // 表单数据
}
const props = withDefaults(defineProps<Props>(), {
  attributes: (): ITimePicker => ({}),
  formData: () => ({}),
})
let emits = defineEmits<{
  (e: 'update:modelValue', val: object): void
  (e: 'on-event', val: object): void
}>()

const attrs = computed(() => props.attributes)

const newData = reactive(props.formData)
const data = computed({
  get: () => props.formData[props.attributes.prop],
  set: (val): void => {
    newData[props.attributes.prop] = val
    emits('update:modelValue', newData)
  },
})

const handleChange = (): void => {
  emits('on-event', {
    attrs: props.attributes,
    data: props.formData[props.attributes.prop],
  })
}
</script>
