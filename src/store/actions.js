import * as types from './mutation-types'
import Vue from 'vue'
import ListField from '../models/ListField'

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
  },
  [types.UPDATE_LIST_FIELDS_IN_LISTS] ({commit}, list) {
    return Vue.$http.api.get(`lists(guid'${list.Id}')/fields`)
      .then(response => {
        commit(types.UPDATE_LIST_FIELDS_IN_LISTS, {id: list.Id, fields: response.data.value})
      })
  },
  [types.CREATE_LIST] ({commit}, list) {
    return Vue.$http.api.post(`lists`, list)
      .then(response => {
        const fieldsCalls = []
        for (const field of list.fields) {
          const f = new ListField(field.title, field.type)
          fieldsCalls.push(Vue.$http.api.post(`lists(guid'${response.data.Id}')/fields`, f))
        }
        return Promise.all(fieldsCalls)
        // commit(types.UPDATE_LIST_FIELDS_IN_LISTS, {id: list.Id, fields: response.data.value})
      })
  }
}
