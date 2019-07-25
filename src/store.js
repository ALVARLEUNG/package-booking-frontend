import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    packageList: []
  },
  mutations: {
    initPackageList(state, packageList) {
      state.packageList = packageList;
    }
  },
  actions: {

  }
})
