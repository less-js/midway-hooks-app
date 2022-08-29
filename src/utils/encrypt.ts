import JSEncrypt from 'jsencrypt'
// import { encryptData } from 'long-encrypt'

/**
 * 密码加密
 * @param rsaKey rsa key
 * @param publicKey 公钥
 * @param data 加密数据
 * @returns
 */
export default (rsaKey: string, publicKey: string, data: string): string => {
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(publicKey) // 配置公钥
  const encryptPwd = rsaKey + '|' + encrypt.encrypt(JSON.parse(JSON.stringify(data))) // 拼接密文
  // const encryptPwd = rsaKey + '|' + encryptData(encrypt, JSON.parse(JSON.stringify(data))) // 拼接密文
  return encryptPwd
}
