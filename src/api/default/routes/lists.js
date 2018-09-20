import api from '../http'
import settings from 'electron-settings'

export default {
  async get () {
    let env = settings.get('environment')
    const response = await api.get('_api/web/lists',
      {
        baseURL: env.url,
        headers: {'Content-Type': 'application/json;odata=nometadata'}
      })
    return response.data
  },
  async getItems (listId) {
    let env = settings.get('environment')
    const response = await api.get(`_api/web/lists(guid'${listId}')/items?$top=5000`,
      {
        baseURL: env.url,
        headers: {'Accept': 'application/json;odata=nometadata'}
      })
    return response.data
  }
}
