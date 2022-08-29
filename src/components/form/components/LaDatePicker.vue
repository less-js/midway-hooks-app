<template>
  <el-date-picker
    v-model="data"
    :placeholder="attrs.placeholder"
    :size="attrs.size"
    :readonly="attrs.readonly"
    :editable="attrs.editable || true"
    :clearable="attrs.clearable || true"
    :start-placeholder="attrs.startPlaceholder"
    :end-placeholder="attrs.endPlaceholder"
    :type="attrs.type"
    :format="attrs.format"
    :popper-class="attrs.popperClass"
    :range-separator="attrs.rangeSeparator"
    :default-value="attrs.defaultValue"
    :default-time="attrs.defaultTime"
    :value-format="attrs.valueFormat"
    :shortcuts="attrs.shortcuts"
    :unlink-panels="attrs.unlinkPanels"
    :prefix-icon="attrs.prefixIcon"
    :clear-icon="attrs.clearIcon"
    :validate-event="attrs.validateEvent || true"
    :disabled-date="attrs.disabledDate"
    :teleported="false"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, computed, reactive } from 'vue'
import { IDatePicker } from '@/types/form'

interface Props {
  attributes: IDatePicker
  formData: object // 表单数据
}
const props = withDefaults(defineProps<Props>(), {
  attributes: (): IDatePicker => ({}),
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
