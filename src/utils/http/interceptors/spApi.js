import store from 'store/index'
import { UPDATE_SP_TOKEN, UPDATE_SPO_TOKEN } from 'store/mutation-types'
import settings from 'electron-settings'
import urlJoin from 'url-join'
import { envAuthTypes } from '../../enums'

export default (http) => {
  // https://github.com/mzabriskie/axios#interceptors

  http.interceptors.request.use(async config => {
    const env = settings.get('environment')
    config.baseURL = `${urlJoin(env.url, '_api/web/')}`
    if (env.authType === envAuthTypes.bearer.key) {
      if (!store.getters.isSPOTokenValid) {
        console.log('renew spo token')
        await store.dispatch(UPDATE_SPO_TOKEN, env)
      }
      config.headers['Authorization'] = 'Bearer ' + store.state.token.accessToken
    }
    else if (env.authType === envAuthTypes.ntlm.key) {
      config.withCredentials = true
      if (!store.getters.isSPTokenValid) {
        console.log('renew sp token')
        await store.dispatch(UPDATE_SP_TOKEN)
      }
      config.headers['X-RequestDigest'] = store.state.token.FormDigestValue
    }
    return config
  })

  http.interceptors.response.use(
    response => response,
    (error) => {
      const {response} = error
      if (!response) {
        return Promise.reject(error)
      }
      if ([403].indexOf(response.status) > -1) {
        const env = settings.get('environment')
        if (env.authType === envAuthTypes.bearer) {
          return store.dispatch(UPDATE_SPO_TOKEN)
        }
        else if (env.authType === envAuthTypes.ntlm) {
          return store.dispatch(UPDATE_SP_TOKEN)
        }
      }
      return Promise.reject(error)
    }
  )
}
