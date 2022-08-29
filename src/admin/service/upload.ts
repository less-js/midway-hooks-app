import { useConfig } from '@midwayjs/hooks'
import fs from 'fs'
import path from 'path'
import { formatDate } from '../utils/common'
import { v4 as uuid } from 'uuid'

interface IFile {
  filename: string
  data: string
  fieldName: string
  mimeType: string
}

class UploadService {
  /**
   * 上传文件大小限制
   * @param file
   * @param limit 限制大小，单位 mb, 默认 2mb
   * @returns boolean
   */
  async limitFileSize(files: IFile[], limit = 2): Promise<boolean> {
    const promises = []
    let result: boolean
    files.forEach((file) => {
      const limitPromise = new Promise((resolve, reject) => {
        fs.stat(file.data, function (error, stats) {
          if (!error && stats.isFile()) {
            const fileSize = parseFloat((stats.size / Math.pow(1024, 2)).toFixed(2)) // mb
            resolve(fileSize < limit)
          } else {
            reject('文件大小读取失败')
          }
        })
      })
      promises.push(limitPromise)
    })
    await Promise.all(promises).then((res) => {
      result = res.some((item) => (item ? true : false))
    })
    return result
  }

  /**
   * 上传文件类型是否允许
   * @param extList
   * @param files
   * @returns boolean
   */
  isExt(extList: string[], files: IFile[]): boolean {
    return files.some((file) => extList.some((item) => path.extname(file.data) === item))
  }

  /**
   * 递归创建目录
   * @param dirname
   * @returns
   */
  mkdirRecursive(dirname: string): boolean {
    // 判断是否存在当前 path 的最后一层目录
    if (fs.existsSync(dirname)) return true
    if (this.mkdirRecursive(path.dirname(dirname))) {
      // 若存在，则在当前目录，创建下一层目录
      fs.mkdirSync(dirname)
      return true
    }
  }

  /**
   * 将上传的文件保存到 /public/upload/
   * @param sourceFile
   * @param sourceType
   */
  async saveFile(files: IFile[]): Promise<string[]> {
    const rootDir = path.resolve() + '/public/upload/'
    const newDir = path.resolve(__dirname, rootDir, formatDate())
    const createDri = await this.mkdirRecursive(newDir)
    if (!createDri) return

    const promiseArr = []
    files.forEach((item) => {
      const result = new Promise((resolve, reject) => {
        const extName = path.extname(item.data)
        const fileName = uuid() + extName

        const destPath = path.resolve(__dirname, newDir, fileName)
        const writeStream = fs.createWriteStream(destPath)
        fs.stat(item.data, (err, stats) => {
          if (!err && stats.isFile()) {
            const stream = fs.createReadStream(item.data).pipe(writeStream)
            // 文件写入失败
            writeStream.on('error', (error) => {
              if (error) {
                reject('文件写入失败')
                return
              }
            })
            // 文件写入完成
            writeStream.on('finish', () => {
              resolve(stream.path.toString().replace(path.resolve(), useConfig('domain')))
            })
          } else {
            reject('读取文件失败')
            return
          }
        })
      })
      promiseArr.push(result)
    })
    return Promise.all(promiseArr)
  }
}

export default new UploadService()
