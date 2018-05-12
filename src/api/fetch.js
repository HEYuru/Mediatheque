/**
 * @file 定制后的请求库
 * 1、在请求开始时显示全局加载条
 * 2、请求成功，隐藏加载条
 * 3、请求失败，隐藏加载条并提示"请求失败"
 * @author ltaoo<litaowork@aliyun.com>
 */
import Axios from 'axios'

const FETCH_FAIL = '请求失败，请刷新重试'
const baseUrl = 'http://localhost:3000'
/**
 * 请求失败处理
 */
function reject (message) {
  /* eslint-disable */
  return Promise.reject(message || FETCH_FAIL);
  /* eslint-enable */
}

const axios = Axios.create({
  baseURL: baseUrl || '/'
  // timeout: 8000,
})

// 请求拦截
// Axios.interceptors.request.use((config) => {
//   return config;
// });
// 响应拦截
axios.interceptors.response.use((response) => {
  console.log('imcczy', response)
  // 请求成功
  if (response.status === 200) {
    const {
      success
    } = response.data
    // 获取数据成功
    console.log('imcczy', success)
    if (success === 1) {
      return response.data.data
    } else if (success === 0) {
      return response
    } else {
      return reject(response.data.message)
    }
  } else {
    return reject(response.data.message)
  }
}, (error) => {
  const {
    status
  } = error.response
  if (status === 401) {
    location.href = '#/exception/401'
    // } else if (status === 404) {
    //   location.href = '#/exception/404';
  } else if (status >= 500) {
    location.href = '#/exception/500'
  }
  return reject()
})

axios.defaults.headers.post['Content-Type'] = 'application/json'

export default axios
