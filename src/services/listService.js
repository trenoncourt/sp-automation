import Vue from 'vue'
import settings from 'electron-settings'

export default {
  getByEnvironment (env) {
    const lastEnv = settings.get('environment', env)
    settings.set('environment', env)
    return Vue.$http.default.lists.get()
      .then(response => {
        settings.set('environment', lastEnv)
        return response.value
      })
  }
}
