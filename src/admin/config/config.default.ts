export const domain = 'http://localhost:3000'

export const jwt = {
  secret: 'lessjs.com.deafult',
  expiresIn: '30d',
}

// 对外公开的请求地址
export const openApi = {
  prefix: 'api', // 前缀以 api 开头，如： /api/list，前缀不需要包含“/”
}
