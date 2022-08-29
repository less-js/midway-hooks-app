<template>
  <el-tree-select
    v-model="data"
    :placeholder="attrs.placeholder || '请选择' + attrs.label"
    :data="attrs.options"
    :empty-text="attrs.emptyText"
    :highlight-current="attrs.highlightCurrent"
    :expand-on-click-node="attrs.expandOnClickNode"
    :check-on-click-node="attrs.checkOnClickNode"
    :auto-expand-parent="attrs.autoExpandParent"
    :default-expanded-keys="attrs.defaultExpandedKeys"
    :show-checkbox="attrs.showCheckbox"
    :check-strictly="attrs.checkStrictly"
    :default-checked-keys="attrs.defaultCheckedKeys"
    :current-node-key="attrs.currentNodeKey"
    :accordion="attrs.accordion"
    :indent="attrs.indent"
    :icon="attrs.icon"
    :lazy="attrs.lazy"
    :draggable="attrs.draggable"
    :allow-drag="attrs.allowDrag"
    :allow-drop="attrs.allowDrop"
    :default-expand-all="attrs.defaultExpandAll"
    :filter-node-method="attrs.filterNodeMethod"
    :multiple="attrs.multiple"
    :clearable="attrs.clearable || true"
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
  />
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits, computed, ref } from 'vue'
import { ITreeSelect } from '@/types/form'

interface Props {
  attributes: ITreeSelect
  formData: object // 表单数据
}
const props = withDefaults(defineProps<Props>(), {
  attributes: (): ITreeSelect => ({}),
  formData: () => ({}),
})
let emits = defineEmits<{
  (e: 'update:modelValue', val: object): void
  (e: 'on-event', val: object): void
}>()

const attrs = computed(() =>
  Object.assign(
    {
      defaultExpandAll: true,
      highlightCurrent: true,
      checkStrictly: true,
    },
    props.attributes
  )
)

const newData = ref(props.formData)
const data = computed({
  get: () => props.formData[props.attributes.prop],
  set: (val): void => {
    newData.value[props.attributes.prop] = val
    emits('update:modelValue', newData.value)
  },
})

const handleChange = (): void => {
  emits('on-event', {
    attrs: props.attributes,
    data: props.formData[props.attributes.prop],
  })
}
</script>
