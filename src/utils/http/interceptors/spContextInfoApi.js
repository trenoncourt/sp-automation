import settings from 'electron-settings'
import urlJoin from 'url-join'

export default (http) => {
  // https://github.com/mzabriskie/axios#interceptors

  http.interceptors.request.use(async config => {
    const env = settings.get('environment')
    config.baseURL = `${urlJoin(env.url, '_api/')}`
    return config
  })

  http.interceptors.response.use(
    response => response,
    (error) => {
      const {response} = error
      if (!response) {
        return Promise.reject(error)
      }
      return Promise.reject(error)
    }
  )
}
