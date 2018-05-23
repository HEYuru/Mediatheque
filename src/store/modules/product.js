
import {
  FETCH_PRODUCTS,
  SEARCH_DOUBAN,
  ADD_PRODUCT,
  SEARCH_PRODUCTS
} from '@/constants/values'
import {
  fetchProducts,
  searchProducts,
  searchByDouban
  // createProduct
} from '@/api/product'

// state
const state = {
  data: [],
  // 从豆瓣搜索到的结果
  douban: []
}
// getters
const getters = {
  products: state => state.data,
  douban: state => state.douban,
  bookRes: state => state.data
}
// actions
const actions = {
  /**
   * 获取图书列表
   */
  [FETCH_PRODUCTS] ({
    commit
  }, params) {
    const products = localStorage.getItem('products')
    if (!products) {
      fetchProducts(params)
        .then((res) => {
          commit('save_commodity', res.data)
          console.log('imcczy-commodity', state.data)
        })
        .catch(() => {
          return fetchProducts(null)
        })
    } else {
      commit('save_commodity', JSON.parse(products))
    }
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
          alert('Aucun résultat')
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
    if (cb) {
      cb()
    }
    commit('add_product', params)
  }
}
// mutations
const mutations = {
  save_commodity (state, commoditys) {
    state.data = commoditys
    localStorage.setItem('products', JSON.stringify(state.data))
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
  },
  add_product (state, book) {
    state.data.push(book)
    localStorage.setItem('products', JSON.stringify(state.data))
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
