<template>
  <el-drawer
    v-model="showDrawer"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :destroy-on-close="destroyOnClose"
    :modal="modal"
    :direction="direction"
    :size="size"
    :title="props.title"
    :before-close="handleClose"
  >
    <slot></slot>
  </el-drawer>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, computed } from 'vue'
import { ConfirmBox } from '@/utils/message'

interface Props {
  modelValue: boolean
  title?: string
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  destroyOnClose?: boolean
  modal?: boolean
  direction?: 'rtl' | 'ltr' | 'ttb' | 'btt'
  size?: string | number
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '请传入 title props',
  closeOnClickModal: true,
  closeOnPressEscape: true,
  destroyOnClose: false,
  modal: true,
  direction: 'rtl',
  size: '30%',
})
let emits = defineEmits<{ (e: 'update:modelValue', val: boolean): void }>()

const showDrawer = computed({
  get: () => props.modelValue,
  set: (val) => {
    emits('update:modelValue', val)
  },
})

const handleClose = (done: () => void) => {
  ConfirmBox('您确定要关闭吗？')
    .then(() => {
      // 确认
      emits('update:modelValue', false)
      done()
    })
    .catch(() => {
      // 取消
    })
}
</script>
