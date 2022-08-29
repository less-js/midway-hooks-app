<template>
  <el-color-picker
    v-model="data"
    :size="attrs.size"
    :disabled="attrs.disabled"
    :predefine="attrs.predefine"
    :show-alpha="attrs.showAlpha"
    :color-format="attrs.colorFormat"
    :popper-class="attrs.popperClass"
    :teleported="false"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, computed, reactive } from 'vue'
import { IColorPicker } from '@/types/form'

interface Props {
  attributes: IColorPicker
  formData: object // 表单数据
}
const props = withDefaults(defineProps<Props>(), {
  attributes: (): IColorPicker => ({}),
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
