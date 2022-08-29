<template>
  <div class="icon-picker">
    <el-input
      class="preview"
      v-model="iconText"
      placeholder="请选择图标"
      clearable
      @clear="handleClearIcon"
    />
    <el-button ref="buttonRef" v-click-outside="onClickOutside">
      <el-icon v-if="icon"><component :is="icon" /></el-icon>
      <template v-else>...</template>
    </el-button>
    <el-popover
      ref="popoverRef"
      :virtual-ref="buttonRef"
      virtual-triggering
      :placement="props.placement"
      :offset="props.offset"
      :width="props.width"
      :trigger="props.trigger"
      :teleported="false"
    >
      <el-input
        class="mb-2"
        v-model="keyword"
        placeholder="搜索图标"
        @input="handleSearch"
        clearable
      />
      <el-scrollbar wrap-class="list" max-height="288px" always>
        <template v-for="item in icons" :key="item">
          <el-icon @click="handleSelectIcon(item)">
            <component :is="item" />
          </el-icon>
        </template>
      </el-scrollbar>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { ref, unref, withDefaults, defineProps, defineEmits, computed } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ClickOutside as vClickOutside } from 'element-plus'

interface Props {
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'
  offset?: number
  width?: string | number
  trigger?: 'click' | 'focus' | 'hover' | 'contextmenu'
  modelValue?: string
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placement: 'bottom-end',
  width: '314px',
  trigger: 'click',
  offset: 5,
})
let emits = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()

const icons = ref(Object.keys(ElementPlusIconsVue))

const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}

const iconText = ref('')
const icon = computed({
  get: () => props.modelValue,
  set: (val) => emits('update:modelValue', val),
})
iconText.value = icon.value
const handleSelectIcon = (val) => {
  iconText.value = icon.value = val
  emits('update:modelValue', val)
}
const handleClearIcon = () => {
  icon.value = 'Menu'
  emits('update:modelValue', '')
}

const keyword = ref('')
const handleSearch = (val) => {
  icons.value = Object.keys(ElementPlusIconsVue).filter(
    (item) => item.toLowerCase().search(val.toLowerCase()) >= 0
  )
}
</script>

<style scoped lang="scss">
.icon-picker {
  display: flex;
  flex-direction: row;
  width: auto;
  .preview {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 4px;
    width: 150px;
    height: 32px;
    span {
      font-size: 14px;
      color: #b1b3b8;
    }
    .clear {
      font-size: 13px;
      color: #c0c4cc;
      cursor: pointer;
    }
  }
}
.list {
  i {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    margin: 1px;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    font-size: 16px;
    cursor: pointer;
  }
  i:hover {
    background-color: #ecf5ff;
    color: #53a8ff;
  }
}
:deep .el-scrollbar__view {
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
}
</style>
