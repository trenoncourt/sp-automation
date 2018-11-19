import {mapActions, mapState, mapGetters} from 'vuex'
import settings from 'electron-settings'
import Vue from 'vue'

export const state = {
  environment: null,
  environments: []
}

export const mutations = {
  SET_ENVIRONMENTS (state, newValue) {
    state.environments = newValue
  },
  DEL_ENVIRONMENT (state, newValue) {
    state.environments = newValue
  },
  SET_ENVIRONMENT (state, newValue) {
    state.environment = newValue
  },
  UPDATE_ENVIRONMENT_IN_LIST (state, environment) {
    let index = state.environments.findIndex(e => e.name === environment.name)
    Vue.set(state.environments, index, environment)
  }
}

export const getters = {
}

export const actions = {
  createEnvironment ({commit}, env) {
    const environments = settings.get('environments') || []
    environments.push(env)
    settings.set('environments', environments)
    commit('SET_ENVIRONMENTS', environments)
  },
  delEnvironment ({ commit }, env) {
    const environments = settings.get('environments') || []
    for (let i = 0; i < environments.length; i++) {
      if (environments[i].name === env) {
        environments.splice(i, 1)
        break
      }
    }
    settings.set('environments', environments)
    commit('DEL_ENVIRONMENT', environments)
  },
  updateEnvironment ({commit}, env) {
    settings.set('environment', env)
    commit('SET_ENVIRONMENT', env)
    commit('UPDATE_ENVIRONMENT_IN_LIST', env)
  },
  fetchEnvironments ({commit}) {
    const environments = settings.get('environments') || []
    commit('SET_ENVIRONMENTS', environments)
  },
  selectEnvironment ({commit}, env) {
    env = env || settings.get('environment')

    if (env) {
      settings.set('environment', env)
      commit('SET_ENVIRONMENT', env)
    }
  },
  syncEnvironments (store) {
    settings.set('environments', store.state.environments)
  },
  resetEnvironment ({commit}) {
    commit('SET_ENVIRONMENT', null)
  }
}

export const environmentMixin = {
  computed: {
    ...mapState('environment', ['environment', 'environments']),
    ...mapGetters('environment', [])
  },
  methods: {
    ...mapActions('environment', ['createEnvironment', 'updateEnvironment', 'fetchEnvironments',
      'selectEnvironment', 'syncEnvironments', 'resetEnvironment', 'delEnvironment'])
  }
}
