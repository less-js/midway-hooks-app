<template>
  <el-cascader
    v-model="data"
    :options="attrs.options"
    :props="attrs.props"
    :size="attrs.size || 'default'"
    :placeholder="attrs.placeholder || `请选择${attrs.label}`"
    :disabled="attrs.disabled || false"
    :clearable="attrs.clearable"
    :show-all-levels="attrs.showAllLevels || true"
    :collapse-tags="attrs.collapseTags"
    :collapse-tags-tooltip="attrs.collapseTagsTooltip"
    :separator="attrs.separator || '/'"
    :filterable="attrs.filterable"
    :filter-method="attrs.filterMethod"
    :debounce="attrs.debounce || 300"
    :before-filter="attrs.beforeFilter"
    :popper-class="attrs.popperClass"
    :teleported="attrs.teleported || true"
    :tag-type="attrs.tagType || 'info'"
    @change="handleChange"
  />
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits, computed, reactive } from 'vue'
import { ICascader } from '@/types/form'

interface Props {
  attributes: ICascader
  formData: object // 表单数据
}
const props = withDefaults(defineProps<Props>(), {
  attributes: (): ICascader => ({}),
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
