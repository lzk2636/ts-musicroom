import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{
      token:""
    }
  },
  mutations: {
    saveToken(state,payload){
      state.userInfo.token=payload
    }
  },
  actions: {
  },
  modules: {
  }
})
