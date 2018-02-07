import Vue from 'vue'
import settings from 'electron-settings'

function getItemTypeForListName (name) {
  return 'SP.Data.' + name.charAt(0).toUpperCase() + name.split(' ').join('').slice(1) + 'ListItem'
}

export default {
  getByListIdAndEnvironment (id, env) {
    const lastEnv = settings.get('environment', env)
    settings.set('environment', env)
    return Vue.$http.default.get(`_api/web/lists(guid'${id}')/items?$top=5000`,
      {
        baseURL: env.url,
        headers: {'Accept': 'application/json;odata=nometadata'}
      })
      .then(response => {
        settings.set('environment', lastEnv)
        return response.data.value
      })
  },
  add (list, listItem) {
    return Vue.$http.api.post(`lists(guid'${list.Id}')/items`,
      {...listItem, __metadata: {type: getItemTypeForListName(list.Title)}},
      {
        headers: {
          'Content-Type': 'application/json;odata=verbose',
          'Accept': 'application/json;odata=nometadata'
        }
      })
      .then(response => {
        return response.data
      })
  }
}
