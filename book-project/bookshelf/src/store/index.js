import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user, null, 2));
    }
  },
  actions: {
  },
  modules: {
  }
})
