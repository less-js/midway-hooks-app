import http from '../utils/http'

/**
 * 获取系统信息
 * @param formData
 * @returns
 */
export const uploadImage = async (formData) => {
  return await http.upload('upload-image', formData)
}
