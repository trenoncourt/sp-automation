import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import * as getters from './getters'
import { mutations } from './mutations'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

var state = {
  me: null,
  environment: null,
  token: null,
  environments: [],
  lists: [],
  jsonLists: [],
  fr: {
    months: [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ],
    days: [
      'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'
    ]
  }
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  plugins: [createPersistedState()]
})
