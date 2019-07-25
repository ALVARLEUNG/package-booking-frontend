import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    packageList: [],
    dialogVisible: false,
    status:'ALL'
  },
  mutations: {
    initPackageList(state, packageList) {
      state.packageList = packageList;
    },
    changeDialogVisible(state, status){
      state.dialogVisible = status;
    },
    filterStatus(state, status){
      state.status = status
    }
  }
})
