import Vue from 'vue'
import Vuex from 'vuex'

import product from '@/store/modules/product'
import auth from '@/store/modules/auth'
import cart from '@/store/modules/cart'

// import member from '@/store/modules/member';
// import record from '@/store/modules/record';
// import order from '@/store/modules/order';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    cart,
    product,
    auth
  },
  strict: debug
})

store.dispatch('FETCH_USER')
store.dispatch('fetch_cart')
export default store
