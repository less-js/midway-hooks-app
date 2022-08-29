<template>
  <el-select
    v-model="data"
    :placeholder="attrs.placeholder || '请选择' + attrs.label"
    :multiple="attrs.multiple"
    :clearable="attrs.clearable"
    :size="attrs.size"
    :disabled="attrs.disabled"
    :value-key="attrs.valueKey"
    :collapse-tags="attrs.collapseTags"
    :collapse-tags-tooltip="attrs.collapseTagsTooltip"
    :multiple-limit="attrs.multipleLimit"
    :name="attrs.name"
    :effect="attrs.effect"
    :autocomplete="attrs.autocomplete"
    :filterable="attrs.filterable"
    :allow-create="attrs.allowCreate"
    :filter-method="attrs.filterMethod"
    :remote="attrs.remote"
    :remote-method="attrs.remoteMethod"
    :loading="attrs.loading"
    :loading-text="attrs.loadingText"
    :no-match-text="attrs.noMatchText"
    :no-data-text="attrs.noDataText"
    :popper-class="attrs.popperClass"
    :reserve-keyword="attrs.reserveKeyword"
    :default-first-option="attrs.defaultFirstOption"
    :popper-append-to-body="attrs.popperAppendToBody"
    :teleported="attrs.teleported"
    :persistent="attrs.persistent"
    :automatic-dropdown="attrs.automaticDropdown"
    :clear-icon="attrs.clearIcon"
    :fit-input-width="attrs.fitInputWidth"
    :suffix-icon="attrs.suffixIcon"
    :tag-type="attrs.tagType"
    @change="handleChange"
  >
    <el-option
      v-for="option in attrs.options"
      :key="option.value ? option.value : option"
      :label="option.label ? option.label : option"
      :value="option.value ? option.value : option"
    />
  </el-select>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, computed, reactive } from 'vue'
import { ISelect } from '@/types/form'

interface Props {
  attributes: ISelect
  formData: object // 表单数据
}
const props = withDefaults(defineProps<Props>(), {
  attributes: (): ISelect => ({}),
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
