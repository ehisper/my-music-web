import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug, //  监测state 的改变是否是来源于mutations，不是的话会警告
  plugins: debug ? [createLogger()] : []
})
