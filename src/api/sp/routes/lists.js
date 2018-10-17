import api from '../http'

export default {
  async get () {
    const response = await api.get('lists')
    return response.data
  },
  async create (list) {
    const response = await api.post(`lists`, list, {headers: {'Content-Type': 'application/json;odata=verbose'}})
    return response.data
  },
  async delete (listId) {
    const response = await api.post(`lists(guid'${listId}')`, {}, {
      headers: {
        'Content-Type': 'application/json;odata=verbose',
        'IF-MATCH': '*',
        'X-HTTP-Method': 'DELETE'
      }
    })
    return response.data
  },
  async getFields (listId) {
    const response = await api.get(`lists(guid'${listId}')/fields`)
    return response.data
  },
  async getItemsIds (listId) {
    const response = await api.get(`lists(guid'${listId}')/items?$select=id`)
    return response.data
  },
  async getItems (listId, nbItemsList) {
    const response = await api.get(`lists(guid'${listId}')/items?$top=${nbItemsList}`)
    return response.data
  },
  async createItem (listId, listItem) {
    const response = await api.post(`lists(guid'${listId}')/items`,
      listItem,
      {
        headers: {
          'Content-Type': 'application/json;odata=verbose',
          'Accept': 'application/json;odata=nometadata'
        }
      })
    return response.data
  },
  async deleteItem (listId, itemId) {
    const response = await api.post(`lists(guid'${listId}')/items(${itemId})`, {}, {
      headers: {
        'Content-Type': 'application/json;odata=verbose',
        'IF-MATCH': '*',
        'X-HTTP-Method': 'DELETE'
      }
    })
    return response.data
  },
  async modifItem (listId, listItem, itemId) {
    const response = await api.post(`lists(guid'${listId}')/items(${itemId})`,
      listItem,
      {
        headers: {
          'Content-Type': 'application/json;odata=verbose',
          'IF-MATCH': '*',
          'X-HTTP-Method': 'MERGE'
        }
      })
    return response.data
  },
  async getList (listId) {
    const response = await api.get(`lists(guid'${listId}')`)
    return response.data
  },
  async getUsers () {
    const response = await api.get(`siteusers`)
    return response.data
  },
  async getGroups  () {
    const response = await api.get(`sitegroups`)
    return response.data
  },
  async createField (listId, field) {
    const response = await api.post(`lists(guid'${listId}')/fields`, field, {headers: {'Content-Type': 'application/json;odata=verbose'}})
    return response.data
  },
  async patchField (listId, fieldId, data) {
    const response = await api.post(`lists(guid'${listId}')/fields('${fieldId}')`, data,
      {headers: {'Content-Type': 'application/json;odata=verbose', 'X-HTTP-Method': 'PATCH'}})
    return response.data
  },
  async addDependentLookupField (listId, field) {
    const response = await api.post(`lists(guid'${listId}')/fields/adddependentlookupfield(displayname='${field.title}', primarylookupfieldid='${field.primaryLookupFieldId}', showfield='${field.lookupField}')`
      , {}, {headers: {'Content-Type': 'application/json;odata=verbose'}})
    return response.data
  },
  async addField (listId, field) {
    const response = await api.post(`lists(guid'${listId}')/fields/addfield`, field, {headers: {'Content-Type': 'application/json;odata=verbose'}})
    return response.data
  }
}
