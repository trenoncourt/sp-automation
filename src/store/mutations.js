import * as types from './mutation-types'
import Vue from 'vue'

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
  },
  [types.UPDATE_LISTS] (state, lists) {
    state.lists = lists
  },
  [types.UPDATE_JSON_LISTS] (state, jsonLists) {
    state.jsonLists = jsonLists
  },
  [types.UPDATE_LIST_FIELDS_IN_LISTS] (state, list) {
    let currentList = state.lists.find(o => o.Id === list.id)
    Vue.set(currentList, 'fields', list.fields)
  }
}
