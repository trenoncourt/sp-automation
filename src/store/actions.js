import * as types from './mutation-types'
import Vue from 'vue'
import Field from '../models/Field'
import RandomItem from '../models/RandomItem'
import List from '../models/List'

export default {
  [types.UPDATE_SP_TOKEN] ({commit}) {
    return Vue.$http.apiContextInfo.contextInfo.create()
      .then(response => {
        commit(types.UPDATE_TOKEN, response)
      })
  },
  [types.UPDATE_SPO_TOKEN] ({commit}, env) {
    const AuthenticationContext = require('adal-node').AuthenticationContext
    const authorityHostUrl = 'https://login.microsoftonline.com'
    const authorityUrl = authorityHostUrl + '/' + env.tenantId
    const context = new AuthenticationContext(authorityUrl)
    return new Promise((resolve, reject) => {
      context.acquireTokenWithClientCertificate(env.resource, env.clientId, env.certPrivateKey, env.certThumbprint, function (err, tokenResponse) {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          commit(types.UPDATE_TOKEN, tokenResponse)
          resolve()
        }
      })
    })
  },
  [types.UPDATE_LISTS] ({commit}) {
    return Vue.$http.api.lists.get()
      .then(response => {
        commit(types.UPDATE_LISTS, response.value)
      })
      .catch(error => {
        console.log(error)
      })
  },
  [types.UPDATE_LIST_FIELDS_IN_LISTS] ({commit}, list) {
    return Vue.$http.api.lists.getFields(list.Id)
      .then(response => {
        commit(types.UPDATE_LIST_FIELDS_IN_LISTS, {id: list.Id, fields: response.value})
      })
  },
  [types.CREATE_LIST] ({commit}, list) {
    return Vue.$http.api.lists.create(list)
      .then(response => {
        commit(types.CREATE_LIST, response)
        return response.Id
      })
  },
  [types.CREATE_LIST_FIELDS] ({commit}, list) {
    const fieldsCalls = []
    for (const field of list.fields) {
      const f = new Field(field.title, field.type)
      fieldsCalls.push(Vue.$http.api.lists.createField(list.id, f))
    }
    return Promise.all(fieldsCalls)
  },
  [types.CREATE_LIST_FIELD] ({commit}, list) {
    if (list.field.lookupListId) {
      if (list.field.primaryLookupFieldId) {
        return Vue.$http.api.lists.addDependentLookupField(list.id, list.field)
          .then(response => {
            if (list.field.allowMultipleValues) {
              const fieldId = response.Id
              return Vue.$http.api.lists.patchField(list.id, response.Id,
                {
                  '__metadata': {'type': 'SP.FieldLookup'},
                  'AllowMultipleValues': true
                })
                .then(() => {
                  return fieldId
                })
            }
            return response.Id
          })
      } else {
        return Vue.$http.api.lists.addField(list.id, list.field)
          .then(response => {
            if (list.field.allowMultipleValues) {
              const fieldId = response.Id
              return Vue.$http.api.lists.patchField(list.id, response.Id,
                {
                  '__metadata': {'type': 'SP.FieldLookup'},
                  'AllowMultipleValues': true
                })
                .then(() => {
                  return fieldId
                })
            }
            return response.Id
          })
      }
    } else {
      return Vue.$http.api.lists.createField(list.id, list.field)
    }
  },

  [types.CREATE_LIST_ITEMS] (state, payload) {
    const itemsCalls = []
    for (let i = 0; i < payload.count; i++) {
      const randomItem = new RandomItem(payload.list.Title)
      randomItem.setField(payload.list.fields)
      randomItem.setFieldGroups(payload.fieldGroups)
      randomItem.setLookupFields(payload.lookupFields)
      itemsCalls.push(Vue.$http.api.lists.createItem(payload.list.Id, randomItem))
    }
    return Promise.all(itemsCalls)
  },

  [types.DELETE_LIST] ({commit}, list) {
    return Vue.$http.api.lists.delete(list.Id)
      .then(() => {
        commit(types.DELETE_LIST, List.Id)
      })
  }
}
