<template>
  <el-dialog
    v-model="visible"
    :title="title"
    :width="props.width"
    :top="props.top"
    :append-to-body="props.appendToBody"
    :lock-scroll="props.lockScroll"
    :custom-class="props.customClass"
    :open-delay="props.openDelay"
    :close-delay="props.closeDelay"
    :close-on-click-modal="props.fullscreen"
    :close-on-press-escape="props.closeOnPressEscape"
    :show-close="props.showClose"
    :draggable="props.draggable"
    :center="props.center"
    :destroy-on-close="props.destroyOnClose || true"
    :before-close="handleBeforeClose"
    :fullscreen="fullscreen.switch"
    @close="handleClose"
  >
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleSubmit"> 确认 </el-button>
        <el-button type="danger" @click="handleReset"> 重置 </el-button>
      </span>
    </template>
    <el-button class="fullscreen" :icon="fullscreen.icon" @click="handleChangeFullscreen" />
  </el-dialog>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  defineProps,
  withDefaults,
  defineEmits,
  computed,
  useSlots,
  toRef,
  nextTick,
} from 'vue'
import useTitle from '@/hooks/useTitle'
import { ConfirmBox, MessageError } from '@/utils/message'
// import type { FormRules } from 'element-plus'
// import { IFromRow } from '@/types/form'

interface Props {
  modelValue: boolean
  title?: string
  width?: number | string
  fullscreen?: boolean
  top?: string
  modal?: boolean
  appendToBody?: boolean
  lockScroll?: boolean
  customClass?: string
  openDelay?: number
  closeDelay?: number
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  showClose?: boolean
  beforeClose?: (done) => void
  draggable?: boolean
  center?: boolean
  destroyOnClose?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  width: '560px',
  appendToBody: true,
  showClose: true,
  closeOnClickModal: false,
  lockScroll: true,
})

let emits = defineEmits<{
  (e: 'update:modelValue', isVisible: boolean): void
  (e: 'before-close', isVisible: boolean): void
  (e: 'on-close', isVisible: boolean): void
  (e: 'on-event', isVisible: boolean): void
  (e: 'update:formData', obj: object): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emits('update:modelValue', val),
})
// const dialogTitle = computed(() => (props.title ? props.title : useTitle(props.formData?.id)))
const dialogFormRef = ref()
const slots = useSlots().default()[0]
// const formRef = toRef(slots.props, 'ref')
// console.log(slots,)
console.log(slots.props)

const handleBeforeClose = (done: () => void) => {
  ConfirmBox('确认需要关闭弹出框？')
    .then(() => {
      emits('before-close', false)
      emits('update:formData', {})
      done()
    })
    .catch(() => {})
}
const handleClose = (): void => {
  fullscreen.switch = false
  fullscreen.switch ? (fullscreen.icon = 'Minus') : (fullscreen.icon = 'FullScreen')
  emits('update:modelValue', false)
}
const handleReset = () => {
  ConfirmBox('确认重置表单数据？')
    .then(() => {
      dialogFormRef.value.formRef.resetFields()
    })
    .catch(() => {})
}
const handleSubmit = () => {
  validate()
    .then((valid) => emits('on-event', valid))
    .catch((valid) => emits('on-event', valid))
}
const validate = (): Promise<boolean> => {
  if (!dialogFormRef.value.formRef) return
  return new Promise((resolve, reject) => {
    dialogFormRef.value.formRef.validate((valid: boolean, message: any) => {
      if (valid) {
        resolve(valid)
      } else {
        reject(valid)
        MessageError(
          message[Object.keys(message)[0]][0].message
            ? message[Object.keys(message)[0]][0].message
            : '校验失败'
        )
      }
    })
  })
}

const fullscreen = reactive({ switch: false, icon: 'FullScreen' })
const handleChangeFullscreen = () => {
  fullscreen.switch = !fullscreen.switch
  fullscreen.switch ? (fullscreen.icon = 'Minus') : (fullscreen.icon = 'FullScreen')
}
</script>

<style lang="scss" scoped>
.fullscreen {
  position: absolute;
  top: 4px;
  right: 54px;
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: none;
  cursor: pointer;
}
</style>
