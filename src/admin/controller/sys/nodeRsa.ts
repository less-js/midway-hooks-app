import { Api, Get } from '@midwayjs/hooks'
import { ctx } from '@/admin/utils/common'
import NodeRasService from '../../service/nodeRsa'

/**
 * 获取 rsa 公钥
 */
export const getRsaPublicKey = Api(Get('/get-rsa-key'), async () => {
  const publicKey = NodeRasService.exportRsaKey()
  if (!publicKey) {
    ctx().fail('获取 rsa 公钥失败')
  }
  ctx().ok({ ...publicKey })
})
