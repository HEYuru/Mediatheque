
import {
  FETCH_BOOKS,
  SEARCH_DOUBAN,
  ADD_BOOK,
  SEARCH_BOOKS
} from '@/constants/values'
import {
  fetchBooks,
  searchBooks,
  searchByDouban,
  createBook
} from '@/api/books'

// state
const state = {
  data: [],
  // 从豆瓣搜索到的结果
  douban: [],
  bookRes: []
}
// getters
const getters = {
  books: state => {
    return state.data
  },
  douban: state => state.douban,
  bookRes: state => state.bookRes
}
// actions
const actions = {
  /**
   * 获取图书列表
   */
  [FETCH_BOOKS] ({
    commit
  }, params) {
    fetchBooks(params)
      .then((res) => {
        commit('save_books', res.data)
        console.log('imcczy-book', state.data)
      })
      .catch(() => {
        return fetchBooks(null)
      })
  },
  /**
   * 获取图书列表
   */
  [SEARCH_BOOKS] ({
    commit
  }, params) {
    // 先以 ISBN 码作为条件查询
    let pathParams = null
    if (params) {
      pathParams = {
        key: params
      }
    }
    searchBooks(pathParams)
      .then((res) => {
        commit('save_books', res.data)
        console.log('imcczy-bookres', state.data)
      })
      .catch((err) => {
        console.log(err)
        if (params) {
          pathParams = {
            title: params
          }
        }
        return fetchBooks(pathParams)
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
  [ADD_BOOK] ({
    commit
  }, {
    params,
    cb
  }) {
    createBook(params)
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
  save_books (state, books) {
    state.data = books
  },
  save_res (state, payload) {
    console.log('imcczy-save-res', payload)
    state.bookRes = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
