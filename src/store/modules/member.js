/**
 * @file member 对应的 module
 * @author ltaoo<litaowork@aliyun.com>
 */
import { Message } from 'element-ui'
import {
  FETCH_MEMBER,
  SEARCH_MEMBER,
  ADD_MEMBER,
  SELECT_MEMBER,
  UPDATE_MEMBER,
  DELETE_MEMBER
} from '@/constants/values'
import {
  fetchMembers,
  // createMember,
  // updateMember,
  deleteMember
} from '@/api/admin/member'

// state
const state = {
  data: [],
  memberRes: [],
  currentMember: {}
}
// getters
const getters = {
  members: state => state.data,
  memberRes: state => state.memberRes,
  currentMember: state => Object.assign(state.currentMember)
}
// actions
const actions = {
  /**
   * 搜索会员
   */
  [FETCH_MEMBER] ({ commit }, { params, cb }) {
    fetchMembers(params).then(res => {
      if (cb) {
        cb(res)
      }
      commit('save_members', res)
    })
  },
  /**
   * 搜索会员
   */
  [SEARCH_MEMBER] ({ commit }, { params, cb }) {
    fetchMembers(params).then(res => {
      if (cb) {
        cb(res.data)
      }
      commit('set_result', res.data)
    })
  },
  [ADD_MEMBER] ({ commit }, params) {
    commit('add_member', params)
  },
  [SELECT_MEMBER] ({ commit }, payload) {
    commit(
      'select_member',
      Object.assign({}, payload, {
        memberRank: parseInt(payload.memberRank, 10)
      })
    )
  },
  [UPDATE_MEMBER] ({ commit }, params) {
    console.log('imcczy-edit-user-num', params.num)
    const mem = state.data.find(item => {
      return item.num === params.num
    })
    const index = state.data.indexOf(mem)
    if (index > -1) {
      commit('delete_member', index)
      commit('add_member', params.data)
    }
    alert('更新成功')
    if (params.cb) {
      params.cb()
    }
  },
  [DELETE_MEMBER] ({ commit }, id, index) {
    deleteMember(id).then(res => {
      Message.success('移除成功')
      commit('delete_member', index)
    })
  }
}
// mutations
const mutations = {
  save_members (state, books) {
    state.data = books
  },
  set_result (state, payload) {
    state.memberRes = payload
  },
  add_member (state, payload) {
    // 直接 push，而不是给一个新数组，这里和 react 不太一样，因为
    // vue 对数组做了监听，所以可以直接改变原数组，react 是单纯的 diff
    // console.log('imcczy-add-member-before', state.data)
    // console.log('imcczy-add-member', payload)
    state.data.push(payload)
    // console.log('imcczy-add-member-after', state.data)
  },
  select_member (state, payload) {
    state.currentMember = payload
  },
  delete_member (state, index) {
    state.data.splice(index, 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
