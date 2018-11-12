// import Vue from 'vue'
// import Vuex from 'vuex'
// import actions from './actions'
// import * as getters from './getters'
// import { mutations } from './mutations'

// Vue.use(Vuex)

// var state = {
//   changeVue: {},
//   me: null,
//   environment: null,
//   token: null,
//   environments: [],
//   lists: [],
//   jsonLists: [],
//   insertDataToList: null,
//   insertDataFromEnvironment: null,
//   insertDataFromList: null,
//   fr: {
//     months: [
//       'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
//     ],
//     days: [
//       'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'
//     ]
//   }
// }

// export default new Vuex.Store({
//   state,
//   actions,
//   getters,
//   mutations
// })

import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
})

// Automatically run the `init` action for every module,
// if one exists.
for (const moduleName of Object.keys(modules)) {
  if (modules[moduleName].actions && modules[moduleName].actions.init) {
    store.dispatch(`${moduleName}/init`)
  }
}

export default store
