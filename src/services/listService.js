import Vue from 'vue'
import settings from 'electron-settings'

export default {
  getByEnvironment (env) {
    const lastEnv = settings.get('environment', env)
    settings.set('environment', env)
    return Vue.$http.default.get('_api/web/lists',
      {
        baseURL: env.url,
        headers: {'Content-Type': 'application/json;odata=nometadata'}
      })
      .then(response => {
        settings.set('environment', lastEnv)
        return response.data.value
      })
  }
}
