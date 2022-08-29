<template>
  <el-input-number
    v-model="data"
    :style="{ width: inputWidth }"
    :min="attrs.min"
    :max="attrs.max"
    :step="attrs.step"
    :step-strictly="attrs.stepStrictly"
    :precision="attrs.precision"
    :size="attrs.size || 'default'"
    :disabled="attrs.disabled"
    :controls="attrs.controls || true"
    :controls-position="attrs.controlsPosition"
    :name="attrs.name"
    :placeholder="attrs.placeholder"
    @change="handleChange"
  />
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits, computed, reactive } from 'vue'
import { IInputNumber } from '@/types/form'

interface Props {
  attributes: IInputNumber
  formData: object // 表单数据
}
const props = withDefaults(defineProps<Props>(), {
  attributes: (): IInputNumber => ({}),
  formData: () => ({}),
})
let emits = defineEmits<{
  (e: 'update:modelValue', val: object): void
  (e: 'on-event', val: object): void
}>()

const attrs = computed(() => props.attributes)
const inputWidth = computed(() => {
  if (props.attributes.width) {
    const w = props.attributes.width
    if (w.toString().indexOf('px') > 0) {
      return w
    } else {
      return w + 'px'
    }
  } else {
    return '200px'
  }
})
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
