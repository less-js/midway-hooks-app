<template>
  <el-slider
    v-model="data"
    :disabled="attrs.disabled"
    :size="attrs.size"
    :input-size="attrs.inputSize"
    :min="attrs.min"
    :max="attrs.max"
    :step="attrs.step"
    :show-input="attrs.showInput"
    :show-input-controls="attrs.showInputControls"
    :show-stops="attrs.showStops"
    :show-tooltip="attrs.showTooltip"
    :format-tooltip="attrs.formatTooltip"
    :range="attrs.range"
    :vertical="attrs.vertical"
    :height="attrs.height"
    :label="attrs.label"
    :debounce="attrs.debounce"
    :tooltip-class="attrs.tooltipClass"
    :marks="attrs.marks"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, computed, reactive } from 'vue'
import { ISlider } from '@/types/form'

interface Props {
  attributes: ISlider
  formData: object // 表单数据
}
const props = withDefaults(defineProps<Props>(), {
  attributes: (): ISlider => ({}),
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
