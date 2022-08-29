<template>
  <el-switch
    v-model="data"
    :disabled="attrs.disabled"
    :name="attrs.name"
    :size="attrs.size"
    :loading="attrs.loading"
    :width="attrs.width"
    :inline-prompt="attrs.inlinePrompt || true"
    :active-icon="attrs.activeIcon"
    :inactive-icon="attrs.inactiveIcon"
    :active-text="attrs.activeText"
    :inactive-text="attrs.inactiveText"
    :active-value="attrs.activeValue"
    :inactive-value="attrs.inactiveValue"
    :active-color="attrs.activeColor"
    :inactive-color="attrs.inactiveColor"
    :border-color="attrs.borderColor"
    :validate-event="attrs.validateEvent"
    :before-change="attrs.beforeChange"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, computed, reactive } from 'vue'
import { ISwitch } from '@/types/form'

interface Props {
  attributes: ISwitch
  formData: object // 表单数据
}
const props = withDefaults(defineProps<Props>(), {
  attributes: (): ISwitch => ({}),
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
  props.attributes.onChange && props.attributes.onChange(data.value)

  emits('on-event', {
    attrs: props.attributes,
    data: props.formData[props.attributes.prop],
  })
}
</script>
