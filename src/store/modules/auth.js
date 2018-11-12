import {mapActions, mapState, mapGetters} from 'vuex'
import settings from 'electron-settings'
import { envAuthTypes } from '../../utils/enums'

export const state = {
  token: null
}

export const mutations = {
  SET_TOKEN (state, newValue) {
    state.token = newValue
  }
}

export const getters = {
  isSpTokenValid () {
    if (!state.token || !state.token.FormDigestValue) {
      return false
    }
    const dateString = state.token.FormDigestValue.split(',')[1]
    if (!dateString) {
      return false
    }
    return state.token && new Date(dateString).setSeconds(state.token.FormDigestTimeoutSeconds) >= new Date()
  },
  isSpoTokenValid () {
    if (!state.token || !state.token.accessToken) {
      return false
    }
    return true
  }
}

export const actions = {
  async updateSpToken ({commit}) {
    const token = await window.http.apiContextInfo.contextInfo.create()
    commit('SET_TOKEN', token)
  },
  async updateSpoToken ({commit}) {
    const env = settings.get('environment')
    const AuthenticationContext = require('adal-node').AuthenticationContext
    const authorityHostUrl = 'https://login.microsoftonline.com'
    const authorityUrl = authorityHostUrl + '/' + env.tenantId
    const context = new AuthenticationContext(authorityUrl)
    const token = await context.acquireTokenWithClientCertificate(env.resource, env.clientId, env.certPrivateKey, env.certThumbprint)
    commit('SET_TOKEN', token)
  },
  async ensureValidToken (store) {
    const env = settings.get('environment')
    if (env.authType === envAuthTypes.bearer) {
      if (!store.isSpoTokenValid) {
        await store.dispatch('updateSpoToken')
      }
    } else if (env.authType === envAuthTypes.ntlm.key) {
      if (!store.isSpTokenValid) {
        await store.dispatch('updateSpToken')
      }
    }
  },
  clearToken ({commit}) {
    commit('SET_TOKEN', null)
  }
}

export const authMixin = {
  computed: {
    ...mapState('auth', ['token']),
    ...mapGetters('auth', ['isSpTokenValid', 'isSpoTokenValid'])
  },
  methods: {
    ...mapActions('auth', ['ensureValidToken', 'clearToken'])
  }
}
