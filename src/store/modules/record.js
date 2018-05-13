/**
 * @file record 对应的 module
 * @author ltaoo<litaowork@aliyun.com>
 */
import {
  Message
} from 'element-ui'
import {
  FETCH_RECORDS,
  SEARCH_RECORDS,
  CREATE_RECORD,
  UPDATE_RECORD
} from '@/constants/values'
import {
  fetchRecords,
  createRecord,
  updateRecord
} from '@/api/admin/records'

import {
  returnTime,
  rank
} from '@/api/utils'

// state
const state = {
  data: [],
  recordRes: []
}
// getters
const getters = {
  records: state => {
    return state.data
  },
  recordRes: state => state.recordRes
}
// actions
const actions = {
  /**
   * 借阅记录列表
   */
  [FETCH_RECORDS] ({
    commit
  }, params) {
    fetchRecords(params)
      .then((res) => {
        const records = res.data.map(record => {
          // const tagtable = {
          // 0: '超期',
          // 1: '已还',
          // 2: '未还'
          // }
          const flag = returnTime(
            record.returnTime,
            record.borrowTime,
            record.memberRank
          )
          return {
            ...record,
            memberRank: rank(record.memberRank),
            // returnTime: returnTime(record.borrowTime, record.memberRank),
            // 是否归还、超期的标志
            tag: flag
          }
        })
        commit('save_records', records)
      })
  },
  /**
   * 搜索借阅记录
   */
  [SEARCH_RECORDS] ({
    commit
  }, params) {
    fetchRecords(params)
      .then((res) => {
        commit('save_res', res)
      })
  },
  [CREATE_RECORD] (store, {
    params,
    cb
  }) {
    console.log('store', store)
    const {
      rootState
    } = store
    createRecord(params)
      .then((res) => {
        // 清空 books 中的 data 和 members 中的 data
        console.log(rootState)
        if (cb) {
          cb()
        }
        Message.success('借阅成功')
      })
  },
  [UPDATE_RECORD] ({
    commit
  }, {
    id,
    params
  }) {
    updateRecord(id, params)
      .then((res) => {
        Message.success('归还成功')
      })
  }
}
// mutations
const mutations = {
  save_records (state, books) {
    state.data = books
  },
  save_res (state, payload) {
    state.recordRes = new Array(payload)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
