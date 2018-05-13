import fetchJsonp from 'fetch-jsonp'
import { prefix, doubanApi } from '@/api/config'
import fetch from '@/api/fetch'

/**
 * 搜索书籍
 * @param {Object} params - path parameter
 * @param {number} page - 页码
 * @param {number} size - 每页数量
 */
export function fetchProducts (params, page = 1, size = 20) {
  console.log('imcczy-feychbook', params)
  return fetch('/api/product', {
    params: {
      page,
      size
    }
  })
}
export function searchProducts (params, page = 1, size = 20) {
  console.log('imcczy-feychbook', params)
  return fetch('/api/searchproduct', {
    params: {
      ...params,
      page,
      size
    }
  })
}
/**
 * 从豆瓣 api 查询书籍
 */
export function searchByDouban (param) {
  return new Promise((resolve, reject) => {
    fetchJsonp(`${doubanApi}q=${param}&count=10`, {
      jsonpCallback: 'callback'
    })
      .then(response => {
        return response.json()
      })
      .then(json => {
        resolve(json)
      })
      .catch(ex => {
        reject(ex)
      })
  })
}
/**
 * 添加书籍到数据库
 */
export function createProduct (params) {
  return fetch.post('/api/creatproduct', params)
}
/**
 * 根据 id 查询书籍
 * @param {number} id - 书籍 id
 */
export function searchProductById (id) {
  return fetch(`/api/searchproductid/${id}`)
}

// 更新书籍状态
export function updateProductState (param, state) {
  return new Promise((resolve, reject) => {
    fetch(
      `${prefix}/getBooks.service.php?action=updateState&bookId=${param}&state=${state}`
    )
      .then(res => {
        return res.json()
      })
      .then(json => {
        resolve(json)
      })
      .catch(err => {
        reject(err)
      })
  })
}
