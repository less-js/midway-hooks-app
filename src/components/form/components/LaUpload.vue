<template>
  <el-upload
    class="uploader-component"
    :disabled="attrs.disabled"
    :action="attrs.action"
    :headers="attrs.headers"
    :method="attrs.method"
    :data="attrs.data"
    :name="attrs.name || 'file'"
    :with-credentials="attrs.withCredentials"
    :accept="attrs.accept"
    :drag="attrs.drag"
    :multiple="attrs.multiple"
    :limit="attrs.limit"
    :show-file-list="attrs.showFileList"
    :list-type="attrs.listType"
    :auto-upload="attrs.autoUpload"
    :on-exceed="attrs.onExceed"
    :on-preview="attrs.onPreview"
    :on-remove="attrs.onRemove"
    :before-remove="attrs.beforeRemove"
    :on-success="attrs.onSuccess"
    :on-error="attrs.onError"
    :on-progress="attrs.onProgress"
    :on-change="attrs.onChange"
    :before-upload="attrs.beforeUpload"
    :http-request="attrs.httpRequest"
    :file-list="data"
  >
    <!-- 手动上传，不支持拖拽 -->
    <template v-if="!attrs.autoUpload" #trigger>
      <el-button type="primary">{{ attrs.uploadSelectText || '选择文件' }}</el-button>
    </template>
    <el-button v-if="!attrs.autoUpload" type="success">
      {{ attrs.uploadText || '点击上传' }}
    </el-button>
    <!-- 自动上传 -->
    <template v-if="attrs.autoUpload">
      <template v-if="!attrs.drag">
        <!-- 如果是头像类型，那么图片数据格式为：[{url:'xxxx', xxx:'xxx'}]，其中必修包含 url 字段 -->
        <template v-if="!attrs.showFileList">
          <div class="avatar" ref="avatar" v-if="data && data[0] && data[0].url">
            <img :src="data[0].url" />
            <span class="el-upload-actions">
              <el-icon @click.stop="handledPreview(data[0].url)"><zoom-in /></el-icon>
              <el-icon><Upload /></el-icon>
              <el-icon @click.stop="handledDelete(data[0].url)"><Delete /></el-icon>
            </span>
          </div>
          <el-icon v-else class="uploader-icon"><Plus /></el-icon>
        </template>
        <el-icon v-else class="uploader-icon"><Plus /></el-icon>
      </template>
      <div class="el-upload-dragger" v-else>
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div
          class="el-upload__text"
          v-html="attrs.dragText || `Drop file here or <em>click to upload</em>`"
        ></div>
      </div>
    </template>
    <template #tip>
      <div
        class="el-upload__tip"
        v-html="attrs.tips || 'jpg/png files with a size less than 500KB.'"
      ></div>
    </template>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref, defineProps, withDefaults, computed, watch } from 'vue'
import { IUpload } from '@/types/form'

interface Props {
  attributes: IUpload
  formData: object // 表单数据
}
const props = withDefaults(defineProps<Props>(), {
  attributes: (): IUpload => ({}),
  formData: () => ({}),
})
const attrs = computed(() =>
  Object.assign(
    {
      showFileList: true,
      autoUpload: true,
    },
    props.attributes
  )
)
const data = computed(() => props.formData[props.attributes.prop])

const avatar = ref()
watch(
  () => avatar.value,
  () => {
    avatar.value &&
      avatar.value.addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN') e.stopPropagation()
      })
  },
  { immediate: true }
)
const handledPreview = (file) => attrs.value.onPreview(file)
const handledDelete = (file) => attrs.value.onRemove(file, file)
</script>

<style lang="scss" scoped>
.uploader-component {
  width: 100%;
  ::v-deep .el-upload {
    position: relative;
  }
  ::v-deep .avatar {
    width: 146px;
    height: 146px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e8e7e9;
    &:hover .el-upload-actions {
      transition: all 0.5s;
      background-color: rgba($color: #000000, $alpha: 0.3);

      i {
        transition: all 0.5s;
        color: #fff;
        background-color: rgba($color: #000000, $alpha: 0.5);
      }
    }
    .el-upload-actions {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba($color: #000000, $alpha: 0);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: default;

      i {
        margin: 0 4px;
        padding: 8px;
        background-color: rgba($color: #000000, $alpha: 0);
        border-radius: 100%;
        font-size: 34px;
        color: transparent;
        cursor: pointer;

        &:hover {
          color: #409eff;
        }
      }
    }
  }

  .el-upload-dragger {
    background-color: var(--el-fill-color-blank);
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    box-sizing: border-box;
    width: 360px;
    height: 180px;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  ::v-deep .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
  .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  .el-icon.uploader-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    text-align: center;
  }
  .el-upload--picture-card i {
    margin-top: 0;
  }
}
</style>
