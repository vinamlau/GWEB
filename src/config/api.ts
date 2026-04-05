// 根据当前访问的域名自动判断 API 地址
export const getApiUrl = () => {
  // 如果是本地开发环境
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:3001'
  }
  // 如果是线上环境，使用相同的域名
  return typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.hostname}`
    : ''
}

export const API_URL = import.meta.env.VITE_API_URL || getApiUrl()
