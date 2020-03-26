import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    statePublish: ''
  },
  getters: {

  },
  mutations: {
    setStatePublish (state, x) {
      state.statePublish = x
    }
  },

  actions: {
  },
  modules: {
  }
})
