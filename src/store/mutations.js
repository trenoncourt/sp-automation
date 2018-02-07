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
  [types.CREATE_LIST] (state, list) {
    state.lists.push(list)
  },
  [types.DELETE_LIST] (state, listId) {
    state.lists = state.lists.filter(l => l.Id !== listId)
  },
  [types.UPDATE_JSON_LISTS] (state, jsonLists) {
    state.jsonLists = jsonLists
  },
  [types.UPDATE_LIST_FIELDS_IN_LISTS] (state, list) {
    let currentList = state.lists.find(o => o.Id === list.id)
    Vue.set(currentList, 'fields', list.fields)
  },
  [types.RESET_ENVIRONMENT] (state) {
    state.environment = null
    state.me = null
    state.lists = []
    state.token = null
  },
  [types.UPDATE_ENVIRONMENTS] (state, environments) {
    state.environments = environments
  },
  [types.UPDATE_ENVIRONMENT] (state, environment) {
    state.environment = environment
  },
  [types.UPDATE_ENVIRONMENT_IN_LIST] (state, environment) {
    var index = state.environments.findIndex(e => e.name === environment.name)
    Vue.set(state.environments, index, environment)
  },
  [types.UPDATE_ENVIRONMENT_NAME] (state, name) {
    state.environment.name = name
  },
  [types.UPDATE_ENVIRONMENT_AUTH_TYPE] (state, authType) {
    state.environment.authType = authType
  },
  [types.UPDATE_ENVIRONMENT_URL] (state, url) {
    state.environment.url = url
  },
  [types.UPDATE_ENVIRONMENT_USER] (state, user) {
    state.environment.username = user
  },
  [types.UPDATE_ENVIRONMENT_PASSWORD] (state, password) {
    state.environment.password = password
  },
  [types.UPDATE_ENVIRONMENT_DOMAIN] (state, domain) {
    state.environment.domain = domain
  },
  [types.UPDATE_ENVIRONMENT_USE_CURRENT_USER] (state, useCurrentUser) {
    state.environment.useCurrentUser = useCurrentUser
  },
  [types.UPDATE_INSERT_DATA_FROM_ENVIRONMENT] (state, env) {
    state.insertDataFromEnvironment = env
  },
  [types.UPDATE_INSERT_DATA_FROM_LIST] (state, list) {
    state.insertDataFromList = list
  },
  [types.UPDATE_INSERT_DATA_TO_LIST] (state, list) {
    state.insertDataToList = list
  }
}
