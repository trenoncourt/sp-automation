import * as types from './mutation-types'

export const mutations = {
  [types.UPDATE_ME] (state, me) {
    state.me = me
  },
  [types.UPDATE_TOKEN] (state, token) {
    state.token = token
  },
  [types.RESET_STATE] (state) {
    state.me = null
    state.token = null
  }
}
