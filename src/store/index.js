import Vue from 'vue'
import Vuex from 'vuex'

import global from '@/store/modules/global'
import books from '@/store/modules/books'
import auth from '@/store/modules/auth'

import {
  INIT,
  FETCH_USER
} from '@/constants/values'

// import member from '@/store/modules/member';
// import record from '@/store/modules/record';
// import order from '@/store/modules/order';

// import {
//  INIT,
//  FETCH_USER
// } from '@/constants/values'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    books,
    auth,
    global
  },
  strict: debug
})

store.dispatch(INIT)
store.dispatch(FETCH_USER)

export default store
