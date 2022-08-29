<template>
  <el-time-select
    v-model="data"
    :placeholder="attrs.placeholder"
    :readonly="attrs.readonly"
    :disabled="attrs.disabled"
    :editable="attrs.editable"
    :clearable="attrs.clearable"
    :size="attrs.size"
    :start="attrs.start"
    :step="attrs.step"
    :end="attrs.end"
    :effect="attrs.effect"
    :prefix-icon="attrs.prefixIcon"
    :clear-icon="attrs.clearIcon"
    :format="attrs.format"
    :min-time="attrs.minTime"
    :max-time="attrs.maxTime"
    :teleported="false"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, computed, reactive } from 'vue'
import { ITimeSelect } from '@/types/form'

interface Props {
  attributes: ITimeSelect
  formData: object // 表单数据
}
const props = withDefaults(defineProps<Props>(), {
  attributes: (): ITimeSelect => ({}),
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
