<template>
  <el-input
    v-model="data"
    :style="{ width: inputWidth }"
    :type="attrs.type || 'text'"
    :placeholder="attrs.placeholder || `请输入${attrs.label}`"
    :maxlength="attrs.maxlength"
    :minlength="attrs.minlength"
    :show-word-limit="attrs.showWordLimit"
    :clearable="attrs.clearable || true"
    :show-password="attrs.showPassword"
    :disabled="attrs.disabled"
    :size="attrs.size"
    :prefix-icon="attrs.prefixIcon"
    :suffix-icon="attrs.suffixIcon"
    :rows="attrs.rows"
    :autosize="attrs.autosize"
    :autocomplete="attrs.autocomplete || 'off'"
    :name="attrs.name"
    :readonly="attrs.readonly"
    :max="attrs.max"
    :min="attrs.min"
    :step="attrs.step"
    :resize="attrs.resize"
    :autofocus="attrs.autofocus"
    :form="attrs.form"
    :tabindex="attrs.tabindex"
    :validate-event="attrs.validateEvent || true"
    :input-style="attrs.inputStyle"
    @change="handleChange"
  />
</template>
<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, computed, reactive } from 'vue'
import { IInput } from '@/types/form'

interface Props {
  attributes: IInput
  formData: object // 表单数据
}
const props = withDefaults(defineProps<Props>(), {
  attributes: (): IInput => ({}),
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
