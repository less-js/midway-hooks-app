import { Api } from '@midwayjs/hooks'
import { Upload, useFiles } from '@midwayjs/hooks-upload'
import { ctx } from '../../utils/common'
import UploadService from '../../service/upload'

export default Api(Upload('/upload-image'), async () => {
  const files = useFiles()
  const extList = ['.jpg', '.jpeg', '.png', '.gif', '.wbmp', '.webp']
  const isExt = UploadService.isExt(extList, files.file)
  const limitSize = await UploadService.limitFileSize(files.file)

  if (!isExt) {
    ctx().fail('上传图片格式不正确.')
  } else if (!limitSize) {
    ctx().fail('上传图片超过 2MB')
  } else {
    try {
      const filesUrl = await UploadService.saveFile(files.file)
      ctx().ok({ filesUrl })
    } catch (error) {
      ctx().fail('图片上传失败')
    }
  }
})
