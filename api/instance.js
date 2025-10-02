import axios from 'axios'

// 创建axios实例
const api = axios.create({
  baseURL: 'https://music.163.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Referer': 'https://music.163.com/',
    'Origin': 'https://music.163.com'
  },
  withCredentials: true
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    console.log(`🚀 发送请求: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.error('❌ 请求失败:', error.message)
    return Promise.reject(error)
  }
)

export default api