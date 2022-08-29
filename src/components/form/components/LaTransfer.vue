<template>
  <el-transfer
    v-model="data"
    :titles="attrs.titles"
    :button-texts="attrs.buttonTexts"
    :props="attrs.props"
    :data="attrs.data"
    :filterable="attrs.filterable"
    :format="attrs.format"
    :filter-placeholder="attrs.filterPlaceholder"
    :filter-method="attrs.filterMethod"
    :target-order="attrs.targetOrder"
    :render-content="attrs.renderContent"
    :left-default-checked="attrs.leftDefaultChecked"
    :right-default-checked="attrs.rightDefaultChecked"
    @change="handleChange"
  />
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits, computed, reactive } from 'vue'
import { ITransfer } from '@/types/form'

interface Props {
  attributes: ITransfer
  formData: object // 表单数据
}
const props = withDefaults(defineProps<Props>(), {
  attributes: (): ITransfer => ({}),
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
<style lang="scss" scoped>
.transfer-footer {
  margin-left: 15px;
  padding: 6px 5px;
}
</style>
