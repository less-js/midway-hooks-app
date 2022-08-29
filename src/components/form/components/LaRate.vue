<template>
  <el-rate
    v-model="data"
    :size="attrs.size"
    :disabled="attrs.disabled"
    :allow-half="attrs.allowHalf"
    :low-threshold="attrs.lowThreshold || 2"
    :high-threshold="attrs.highThreshold || 4"
    :colors="attrs.colors"
    :void-color="attrs.voidColor"
    :disabled-void-color="attrs.disabledVoidColor"
    :icons="attrs.icons"
    :void-icon="attrs.voidIcon"
    :disabled-void-icon="attrs.disabledVoidIcon"
    :show-text="attrs.showText"
    :show-score="attrs.showScore"
    :text-color="attrs.textColor"
    :texts="attrs.texts"
    :score-template="attrs.scoreTemplate"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, computed, reactive } from 'vue'
import { IRate } from '@/types/form'

interface Props {
  attributes: IRate
  formData: object // 表单数据
}
const props = withDefaults(defineProps<Props>(), {
  attributes: (): IRate => ({}),
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
