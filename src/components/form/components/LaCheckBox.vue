<template>
  <el-checkbox-group
    v-model="data"
    :text-color="attrs.textColor"
    :fill="attrs.fill"
    :min="attrs.min"
    :max="attrs.max"
    :groupSize="attrs.groupSize"
  >
    <template v-if="attrs.button">
      <el-checkbox-button
        v-for="option in attrs.options"
        :key="option.value ? option.value : option"
        :label="option.label ? option.label : option"
        @change="handleChange"
      />
    </template>
    <template v-else>
      <el-checkbox
        v-for="option in attrs.options"
        :key="option.value ? option.value : option"
        :label="option.label ? option.label : option"
        :border="attrs.border"
        :checked="attrs.checked"
        :indeterminate="attrs.indeterminate"
        @change="handleChange"
      >
        {{ option.value ? option.value : option }}
      </el-checkbox>
    </template>
  </el-checkbox-group>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits, computed, reactive } from 'vue'
import { ICheckBox } from '@/types/form'

interface Props {
  attributes: ICheckBox
  formData: object // 表单数据
}
const props = withDefaults(defineProps<Props>(), {
  attributes: (): ICheckBox => ({}),
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
