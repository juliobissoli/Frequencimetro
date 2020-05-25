import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../utils/auth'
import api from './api'
import jwt_decode from 'jwt-decode'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      name: '',
      email: '',
      type: '',
      uid: null,
      isAdmin: false
    },
    isAdmin: false,
    userList: [],
    isLoading: false
  },
  mutations: {
    loading(state){
      console.log('set isLoading')
      state.isLoading = true
    },
    notLoading(state){
      state.isLoading = false
    },
    async setUser(state) {
      if (state.user.uid === null) {
        const id = jwt_decode(auth.token()).uid
        try {
          api.get('/showUser/' + id).then((res) => {
            console.log(res.data)
            state.isAdmin = res.data.isAdmin
            state.user = res.data
          })
        } catch (err) {
          console.log(err)
        }
      }
    },
    async setUserList(state) {
      console.log('ta qui')
      try {
       await api.get('/listUser').then((res) => {
          state.userList = res.data
        })
      }
      catch (err) {
        console.log(err)
      }
      console.log('set notLoading')
      state.isLoading = false
    },
    cleanStores(state) {
      state.user = {
        name: '',
        email: '',
        type: '',
        uid: null,
        isAdmin: false
      }
      state.isAdmin = false
    }
  },

  getters: {
    user_list: state => state.userList
  }
})

export { store }
