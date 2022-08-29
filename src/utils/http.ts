import router from '@/router'
import axios from 'axios'
import NProgress from 'nprogress'
import useCache from '@/utils/storage'
// import { filterParams } from '@/utils/common'

// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:3000/sys/'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://prod.xxx.com'
}

axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 请求列表(防重复提交)
const requestList = []
const cancelToken = axios.CancelToken

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    NProgress.start()
    config.headers.Authorization = useCache.getCache('token')

    // 防止重复提交（如果本次是重复操作，则取消，否则将该操作标记到 requestList 中）
    config.cancelToken = new cancelToken((cancel) => {
      const requestFlag =
        JSON.stringify(config.url) + JSON.stringify(config.data) + '&' + config.method
      if (requestList.includes(requestFlag)) {
        // 请求标记已经存在，则取消本次请求，否则在请求列表中加入请求标记
        cancel() // 取消本次请求
      } else {
        requestList.push(requestFlag)
      }
    })

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    NProgress.done()
    if (!response.data) {
      return response
    }
    // 请求返回后，将请求标记从 requestList 中移除
    const requestFlag =
      JSON.stringify(response.config.url) +
      JSON.stringify(response.config.data) +
      '&' +
      response.config.method
    requestList.splice(
      requestList.findIndex((item) => item === requestFlag),
      1
    )

    // 获取更新的token
    const { authorization } = response.headers
    // 如果 token 存在则把数据放到 localStorage
    if (authorization) {
      useCache.setCache('token', authorization)
    }
    const { status } = response.data
    if (status === 1000 || status === 1001) {
      // 如果返回的状态码为 1000，说明接口请求成功，可以正常拿到数据
      return response
    } else if (status === 1003) {
      // 如果 1003(token失效) 则到登录页
      router.push('/login')
    } else {
      return Promise.reject(response)
    }
  },
  (error) => {
    // 置空请求列表
    requestList.length = 0
    // 在这里对异常状态作统一处理
    // if (error.response.status) {
    // 处理请求失败的情况
    // 对不同返回码对相应处理
    return Promise.reject(error)
    // }
  }
)

interface IResponseData<T> {
  status: number
  data?: T
  message: string
  error?: string
}
interface IHttp {
  get<T>(url: string, params?: unknown): Promise<IResponseData<T>>
  post<T>(url: string, params?: unknown): Promise<IResponseData<T>>
  delete<T>(url: string, params: unknown): Promise<IResponseData<T>>
  upload<T>(url: string, params: unknown): Promise<IResponseData<T>>
  // download(url: string): void
}

const http: IHttp = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      // NProgress.start()
      axios
        .get(url, { params })
        .then((res) => {
          // NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          // NProgress.done()
          reject(err.data)
        })
    })
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      // NProgress.start()
      axios
        .post(url, { args: [params] })
        // .post(url, { args: [filterParams(params)] })
        .then((res) => {
          // NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          // NProgress.done()
          reject(err.data)
        })
    })
  },
  delete(url, params) {
    return new Promise((resolve, reject) => {
      // NProgress.start()
      axios
        .delete(url, { data: { args: [params] } })
        .then((res) => {
          // NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          // NProgress.done()
          reject(err.data)
        })
    })
  },
  upload(url, file) {
    return new Promise((resolve, reject) => {
      // NProgress.start()
      axios
        .post(url, file, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          // NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          // NProgress.done()
          reject(err.data)
        })
    })
  },

  // download(url) {
  //   const iframe = document.createElement('iframe')
  //   iframe.style.display = 'none'
  //   iframe.src = url
  //   iframe.onload = function () {
  //     document.body.removeChild(iframe)
  //   }
  //   document.body.appendChild(iframe)
  // },
}
export default http
