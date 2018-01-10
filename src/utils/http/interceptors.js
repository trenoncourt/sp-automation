import store from 'store'
import { UPDATE_TOKEN } from 'store/mutation-types'

export default (http) => {
  // https://github.com/mzabriskie/axios#interceptors

  http.interceptors.request.use(async config => {
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
      if ([403].indexOf(response.status) > -1) {
        return store.dispatch(UPDATE_TOKEN)
      }
      return Promise.reject(error)
    }
  )
}
