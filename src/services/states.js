import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      name: '',
      email: '',
      type: '',
      uid: null,
      isAdmin: false
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  }
})

export { store }
