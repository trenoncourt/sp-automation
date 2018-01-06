import store from 'store'
import {UPDATE_TOKEN} from 'store/mutation-types'

export default (http) => {
  // https://github.com/mzabriskie/axios#interceptors

  http.interceptors.request.use(config => {
    debugger
    console.log(store)
    if (!store.getters.isTokenValid) {
      console.log('renew token')
      store.dispatch(UPDATE_TOKEN)
        .then(() => {
          config.headers.common['X-RequestDigest'] = store.state.token.FormDigestValue
        })
    }
    config.headers.common['X-RequestDigest'] = store.state.token.FormDigestValue
    return config
  })

  http.interceptors.response.use(
    response => response,
    (error) => {
      const {response} = error
      if ([401, 403].indexOf(response.status) > -1) {
        return Promise.reject(error)
      }
      return Promise.reject(error)
    }
  )
}
