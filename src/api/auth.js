import fetch from '@/api/fetch'

/**
 * 用户登录
 */
export function login (params) {
  return fetch.post('/api/login', params)
}
