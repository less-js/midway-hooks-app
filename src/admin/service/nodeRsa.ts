import NodeRSA from 'node-rsa'
import { v4 as uuid } from 'uuid'
import { ctx } from '../utils/common'

interface IRsaKey {
  publicKey: string
  rsaKey: string
}

class NodeRasService {
  /**
   * export rsa key
   */
  exportRsaKey(): IRsaKey {
    const key = new NodeRSA({ b: 512 }) // 生成 512 位秘钥
    key.setOptions({ encryptionScheme: 'pkcs1' })
    const publicKey = key.exportKey('pkcs8-public') // 导出公钥
    const privateKey = key.exportKey('pkcs8-private') // 导出私钥

    const rsaKey = uuid()
    ctx().session[rsaKey] = privateKey // 把私钥赋值给 session
    return { publicKey, rsaKey }
  }

  /**
   * rsa 解密
   * @param privateKey
   * @param data
   * @returns
   */
  decryptRasKey(data: any): string {
    const arr = data.split('|')
    const privateKey = ctx().session[arr[0]] // 私钥
    const publicKey = arr[1] // 公钥
    const nodeRsa = new NodeRSA(privateKey)
    nodeRsa.setOptions({ encryptionScheme: 'pkcs1' })
    return nodeRsa.decrypt(publicKey, 'utf8')
  }
}

export default new NodeRasService()
