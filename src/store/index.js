import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import * as getters from './getters'
import { mutations } from './mutations'

Vue.use(Vuex)

var state = {
  me: null,
  environment: null,
  token: null,
  environments: [],
  lists: [],
  jsonLists: [],
  insertDataToList: null,
  insertDataFromEnvironment: null,
  insertDataFromList: null,
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
  mutations
})
