import Vue from 'vue'
import settings from 'electron-settings'

function getItemTypeForListName (name) {
  return 'SP.Data.' + name.charAt(0).toUpperCase() + name.split(' ').join('').slice(1) + 'ListItem'
}

export default {
  getByListIdAndEnvironment (id, env) {
    const lastEnv = settings.get('environment', env)
    settings.set('environment', env)
    return Vue.$http.default.lists.getItems(id)
      .then(response => {
        settings.set('environment', lastEnv)
        return response.value
      })
  },
  add (list, listItem) {
    return Vue.$http.api.lists.createItem(list.Id,
      {...listItem, __metadata: {type: getItemTypeForListName(list.Title)}})
      .then(response => {
        return response
      })
  }
}
