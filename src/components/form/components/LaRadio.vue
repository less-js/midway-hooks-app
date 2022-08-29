<template>
  <el-radio-group
    v-model="data"
    :size="attrs.size"
    :disabled="attrs.disabled"
    :text-color="attrs.textColor"
    :fill="attrs.fill"
    @change="handleChange"
  >
    <template v-if="attrs.button">
      <el-radio-button v-for="option in attrs.options" :key="option.label" :label="option.label">
        {{ option.value }}
      </el-radio-button>
    </template>
    <template v-else>
      <el-radio
        v-for="option in attrs.options"
        :key="option.label"
        :label="option.label"
        :border="attrs.border"
        :size="attrs.size"
        :disabled="attrs.disabled"
      >
        {{ option.value }}
      </el-radio>
    </template>
  </el-radio-group>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits, computed, reactive } from 'vue'
import { IRadio } from '@/types/form'

interface Props {
  attributes: IRadio
  formData: object // 表单数据
}
const props = withDefaults(defineProps<Props>(), {
  attributes: (): IRadio => ({}),
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
