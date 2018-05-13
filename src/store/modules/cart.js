
// initial state
// shape: [{ id, quantity }]
const state = {
  added: [],
  checkoutStatus: null
}

// getters
const getters = {
  checkoutStatus: state => state.checkoutStatus,
  cartProducts: state => state.added

  // cartProducts: (state, rootState) => {
  //   return state.added.map(id => {
  //     return rootState.products.data.find(product => product.id === id)
  //   })
  // },

  // cartTotalPrice: (state, getters) => {
  //   return getters.cartProducts.reduce((total, product) => {
  //     return total + product.price * product.quantity
  //   }, 0)
  // }
}

// actions
const actions = {
  checkout ({ commit, state }, products) {
    // const savedCartItems = [...state.added]
    commit('setCheckoutStatus', null)
    // empty cart
    commit('setCartItems', [])
    // shop.buyProducts(
    //   products,
    //   () => commit('setCheckoutStatus', 'successful'),
    //   () => {
    //     commit('setCheckoutStatus', 'failed')
    //     // rollback to the cart saved before sending the request
    //     commit('setCartItems', { items: savedCartItems })
    //   }
    // )
  },

  addProductToCart ({ state, commit }, product) {
    console.log('add to cat', product)
    commit('setCheckoutStatus', null)
    if (product.inventory > 0) {
      let cartItem = null
      if (state.added) { cartItem = state.added.find(item => item.id === product.id) }
      if (!cartItem) {
        commit('pushProductToCart', product)
      } else {
        console.log('只允许有一份')
        return
      }
      console.log('add to cat', state.added)
      // remove 1 item from stock
      commit('decrementProductInventory', product)
    }
  },
  removeFromCart ({ state, commit }, product) {
    const index = state.added.indexOf(product)
    if (index > -1) {
      commit('remove', index)
      commit('incrementProductInventory', product)
    }
  },
  fetch_cart ({ state, commit }) {
    let cartInfo = localStorage.getItem('carts')
    commit('setCartItems', cartInfo ? JSON.parse(cartInfo) : [])
  }
}

// mutations
const mutations = {
  pushProductToCart (state, product) {
    state.added.push(product)
    localStorage.setItem('carts', JSON.stringify(state.added))
  },
  setCartItems (state, items) {
    state.added = items
  },

  setCheckoutStatus (state, status) {
    state.checkoutStatus = status
  },
  remove (state, index) {
    state.added.splice(index, 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
