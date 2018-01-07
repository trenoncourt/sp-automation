import * as types from './mutation-types'
import Vue from 'vue'

export default {
  [types.UPDATE_TOKEN] ({commit}) {
    return Vue.$http.apiContextInfo.post('contextinfo')
      .then(response => {
        commit(types.UPDATE_TOKEN, response.data)
      })
  },
  [types.UPDATE_LISTS] ({commit}) {
    return Vue.$http.api.get('lists')
      .then(response => {
        commit(types.UPDATE_LISTS, response.data.value)
      })
  }
}
