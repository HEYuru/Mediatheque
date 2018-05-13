
import {
  FETCH_PRODUCTS,
  SEARCH_DOUBAN,
  ADD_PRODUCT,
  SEARCH_PRODUCTS
} from '@/constants/values'
import {
  fetchProducts,
  searchProducts,
  searchByDouban,
  createProduct
} from '@/api/product'

// state
const state = {
  data: [],
  // 从豆瓣搜索到的结果
  douban: [],
  bookRes: []
}
// getters
const getters = {
  products: state => state.data,
  douban: state => state.douban,
  bookRes: state => state.bookRes
}
// actions
const actions = {
  /**
   * 获取图书列表
   */
  [FETCH_PRODUCTS] ({
    commit
  }, params) {
    fetchProducts(params)
      .then((res) => {
        commit('save_commodity', res.data)
        console.log('imcczy-commodity', state.data)
      })
      .catch(() => {
        return fetchProducts(null)
      })
  },
  /**
   * 获取图书列表
   */
  [SEARCH_PRODUCTS] ({
    commit
  }, params) {
    // 先以 ISBN 码作为条件查询
    let pathParams = null
    if (params) {
      pathParams = {
        key: params
      }
    }
    searchProducts(pathParams)
      .then((res) => {
        commit('save_commodity', res.data)
        console.log('imcczy-commodityres', state.data)
      })
      .catch((err) => {
        console.log(err)
        if (params) {
          pathParams = {
            title: params
          }
        }
        return fetchProducts(pathParams)
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  /**
   * 豆瓣搜索
   */
  [SEARCH_DOUBAN] ({
    commit
  }, params) {
    searchByDouban(params)
      .then(res => {
        if (res.books.length === 0) {
          alert('没有结果')
          return
        }
        commit('setDouban', res.books)
      }, (err) => {
        alert(err)
      })
  },
  [ADD_PRODUCT] ({
    commit
  }, {
    params,
    cb
  }) {
    createProduct(params)
      .then((res) => {
        if (cb) {
          cb()
        }
        commit('add_book', res)
      }, (err) => {
        alert(err)
      })
  }
}
// mutations
const mutations = {
  save_commodity (state, commoditys) {
    state.data = commoditys
  },
  save_res (state, payload) {
    console.log('imcczy-save-res', payload)
    state.bookRes = payload
  },
  decrementProductInventory (state, product) {
    product.inventory--
  },
  incrementProductInventory (state, product) {
    product.inventory++
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
