import http from '../utils/http'

/**
 * 获取系统信息
 * @returns
 */
export const getSystemInfo = async () => {
  return await http.get('system/system-info')
}
