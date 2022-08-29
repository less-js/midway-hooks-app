<template>
  <el-button
    :disabled="attrs.disabled"
    :size="attrs.size"
    :type="attrs.type"
    :plain="attrs.plain"
    :round="attrs.round"
    :circle="attrs.circle"
    :loading="attrs.loading"
    :loading-icon="attrs.loadingIcon"
    :icon="attrs.icon"
    :autofocus="attrs.autofocus"
    :native-type="attrs.nativeType"
    :auto-insert-space="attrs.autoInsertSpace"
    @click="handleClick"
  >
    {{ attrs.value }}
  </el-button>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits, computed } from 'vue'
import { IButton } from '@/types/form'

interface Props {
  attributes: IButton
  formData: object // 表单数据
}
const props = withDefaults(defineProps<Props>(), {
  attributes: (): IButton => ({}),
  formData: () => ({}),
})
const attrs = computed(() => props.attributes)
let emits = defineEmits<{
  (e: 'on-event', val: object): void
}>()

const handleClick = (): void => {
  props.attributes.onClick &&
    props.attributes.onClick({
      attrs: props.attributes,
      data: props.formData,
    })

  emits('on-event', {
    attrs: props.attributes,
    data: props.formData,
  })
}
</script>
