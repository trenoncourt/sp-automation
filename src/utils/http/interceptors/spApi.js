import store from 'store/index'
import { UPDATE_TOKEN } from 'store/mutation-types'
import settings from 'electron-settings'
import urlJoin from 'url-join'

export default (http) => {
  // https://github.com/mzabriskie/axios#interceptors

  http.interceptors.request.use(async config => {
    const env = settings.get('environment')
    config.baseURL = `${urlJoin(env.url, '_api/web/')}`
    if (!store.getters.isTokenValid) {
      console.log('renew token')
      await store.dispatch(UPDATE_TOKEN)
    }
    config.headers['X-RequestDigest'] = store.state.token.FormDigestValue
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
        return store.dispatch(UPDATE_TOKEN)
      }
      return Promise.reject(error)
    }
  )
}
