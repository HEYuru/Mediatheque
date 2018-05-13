
import {
  INIT
} from '@/constants/values'

// state
const state = {
  user: null,
  data: null
}
// getters
const getters = {
  isLogin: state => !!state.data
}
// actions
const actions = {
  [INIT] ({
    commit
  }) {
    console.log('init store')
    // 从 localStorage 读信息写入 state
    const userInfo = JSON.parse(localStorage.getItem('user') || '{}')
    commit('INITUSER', userInfo)
  }
}
// mutations
const mutations = {
  SETUSER (state, user) {
    state.user = user
  },
  INITUSER (state, user) {
    state.user = user
  },
  CLEARUSER (state) {
    state.user = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
