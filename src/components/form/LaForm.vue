<template>
  <el-form
    ref="formRef"
    :model="props.model"
    :label-suffix="props.labelSuffix"
    :status-icon="props.statusIcon"
    :size="props.size"
    :disabled="props.disabled"
    :inline="props.inline"
    :label-width="props.labelWidth"
    :label-position="props.labelPosition"
    :hide-required-asterisk="props.hideRequiredAsterisk"
    :rules="props.rules"
  >
    <template v-for="(row, index) in props.formRows" :key="index">
      <el-form-item
        v-if="row.component === 'Button' && row.buttons"
        :label="row.label"
        :prop="row.prop"
        :label-width="!inline ? labelWidth : '0px'"
      >
        <template v-for="(btn, idx) in row.buttons" :key="idx">
          <component
            v-if="btn.prop === 'submit'"
            :loading="props.loading"
            :is="currentComponent(row.component)"
            :attributes="btn"
            :formData="model"
            @on-event="handleEvent"
          />
          <component
            v-else
            :is="currentComponent(row.component)"
            :attributes="btn"
            :formData="model"
            @on-event="handleEvent"
          />
        </template>
      </el-form-item>
      <el-form-item v-else :label="row.label" :prop="row.prop">
        <slot
          v-if="row.component === 'slot'"
          :name="row.slotName"
          :data="{ ...row, ...model }"
        ></slot>
        <component
          v-else
          :is="currentComponent(row.component)"
          :attributes="row"
          :formData="model"
          @on-event="handleEvent"
        />
      </el-form-item>
    </template>
  </el-form>
</template>

<script setup lang="ts">
import { ref, defineProps, withDefaults, defineEmits, defineExpose, computed } from 'vue'
import type { ElForm } from 'element-plus'
import { ConfirmBox, MessageError } from '@/utils/message'
import LaButton from './components/LaButton.vue'
import LaInput from './components/LaInput.vue'
import LaInputNumber from './components/LaInputNumber.vue'
import LaCascader from './components/LaCascader.vue'
import LaCheckBox from './components/LaCheckBox.vue'
import LaColorPicker from './components/LaColorPicker.vue'
import LaDatePicker from './components/LaDatePicker.vue'
import LaTimePicker from './components/LaTimePicker.vue'
import LaTimeSelect from './components/LaTimeSelect.vue'
import LaRadio from './components/LaRadio.vue'
import LaRate from './components/LaRate.vue'
import LaSelect from './components/LaSelect.vue'
import LaSlider from './components/LaSlider.vue'
import LaSwitch from './components/LaSwitch.vue'
import LaTransfer from './components/LaTransfer.vue'
import LaUpload from './components/LaUpload.vue'
import LaTreeSelect from './components/LaTreeSelect.vue'
import { IFromRow } from '@/types/form'
type ElFormInstance = InstanceType<typeof ElForm>

interface Props {
  formRows: Array<IFromRow>
  model: object // 表单数据
  loading?: boolean
  labelSuffix?: string
  statusIcon?: boolean
  size?: 'large' | 'default' | 'small'
  disabled?: boolean
  inline?: false
  labelWidth?: string | number
  labelPosition?: 'left' | 'right' | 'top'
  hideRequiredAsterisk?: boolean
  rules?: any
}
const props = withDefaults(defineProps<Props>(), {
  formRows: (): IFromRow[] => [],
  model: () => ({}),
  loading: false,
  labelSuffix: '',
  statusIcon: false,
  size: 'default',
  disabled: false,
  inline: false,
  labelWidth: 100,
  labelPosition: 'right',
  hideRequiredAsterisk: false,
  rules: null,
})

const componentTypeMap = {
  BUTTON: LaButton,
  INPUT: LaInput,
  INPUTNUMBER: LaInputNumber,
  CASCADER: LaCascader,
  CHECKBOX: LaCheckBox,
  COLORPICKER: LaColorPicker,
  DATEPICKER: LaDatePicker,
  TIMEPICKER: LaTimePicker,
  TIMESELECT: LaTimeSelect,
  RADIO: LaRadio,
  RATE: LaRate,
  SELECT: LaSelect,
  SLIDER: LaSlider,
  SWITCH: LaSwitch,
  TRANSFER: LaTransfer,
  UPLOAD: LaUpload,
  TREESELECT: LaTreeSelect,
}
const currentComponent = computed(
  () => (component) => component && (componentTypeMap[component.toUpperCase()] || null)
)

const formRef = ref<ElFormInstance>()
defineExpose({ formRef }) // 向外抛出表单 ref

let emits = defineEmits<{
  (e: 'on-event', val: object): void
}>()
const handleEvent = (params?: any): void => {
  if (!params) return
  if (params.attrs.prop === 'submit' && props.rules) {
    submit()
      .then((valid) => emits('on-event', { valid }))
      .catch((valid) => emits('on-event', { valid }))
  } else if (params.attrs.prop === 'reset') {
    reset()
  } /* else {
    emits('on-event', { ...params })
  } */
}
// 提交校验
const submit = () => {
  if (!formRef.value) return
  return new Promise((resolve, reject) => {
    formRef.value.validate((valid, message) => {
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
// 重置
const reset = () => {
  ConfirmBox('是否重置表单数据？')
    .then(() => {
      formRef.value.resetFields()
      emits('on-event', { status: 'success', message: '重置完成' })
    })
    .catch(() => {
      emits('on-event', { status: 'cancel', message: '取消重置' })
    })
}
</script>

<style lang="scss" scoped>
:deep .circular {
  width: 20px !important;
}
</style>
