import store from 'src/store/index'
import settings from 'electron-settings'
import urlJoin from 'url-join'
import { envAuthTypes } from '../../utils/enums'

export default (http) => {
  // https://github.com/mzabriskie/axios#interceptors

  http.interceptors.request.use(async config => {
    const env = settings.get('environment')
    config.baseURL = `${urlJoin(env.url, '_api/web/')}`
    await store.dispatch('auth/ensureValidToken')
    if (env.authType === envAuthTypes.bearer.key) {
      config.headers['Authorization'] = 'Bearer ' + store.state.auth.token.accessToken
    } else if (env.authType === envAuthTypes.ntlm.key) {
      config.withCredentials = true
      config.headers['X-RequestDigest'] = store.state.auth.token.FormDigestValue
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
        return store.dispatch('auth/ensureValidToken')
      }
      return Promise.reject(error)
    }
  )
}
