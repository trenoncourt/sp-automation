import * as types from './mutation-types'
import Vue from 'vue'
import Field from '../models/Field'

export default {
  [types.UPDATE_TOKEN] ({commit}) {
    return Vue.$http.apiContextInfo.post('contextinfo')
      .then(response => {
        commit(types.UPDATE_TOKEN, response.data)
      })
  },
  [types.UPDATE_LISTS] ({commit}) {
    return Vue.$http.api.get('lists')
      .then(response => {
        commit(types.UPDATE_LISTS, response.data.value)
      })
  },
  [types.UPDATE_LIST_FIELDS_IN_LISTS] ({commit}, list) {
    return Vue.$http.api.get(`lists(guid'${list.Id}')/fields`)
      .then(response => {
        commit(types.UPDATE_LIST_FIELDS_IN_LISTS, {id: list.Id, fields: response.data.value})
      })
  },
  [types.CREATE_LIST] ({commit}, list) {
    return Vue.$http.api.post(`lists`, list, {headers: {'Content-Type': 'application/json;odata=verbose'}})
      .then(response => {
        commit(types.CREATE_LIST, response.data)
        return response.data.Id
      })
  },
  [types.CREATE_LIST_FIELDS] ({commit}, list) {
    const fieldsCalls = []
    for (const field of list.fields) {
      const f = new Field(field.title, field.type)
      fieldsCalls.push(Vue.$http.api.post(`lists(guid'${list.id}')/fields`, f, {headers: {'Content-Type': 'application/json;odata=verbose'}}))
    }
    return Promise.all(fieldsCalls)
  },
  [types.CREATE_LIST_FIELD] ({commit}, list) {
    if (list.field.lookupListId) {
      if (list.field.primaryLookupFieldId) {
        return Vue.$http.api.post(`lists(guid'${list.id}')/fields/adddependentlookupfield(displayname='${list.field.title}', primarylookupfieldid='${list.field.primaryLookupFieldId}', showfield='${list.field.lookupField}')`
          , {}, {headers: {'Content-Type': 'application/json;odata=verbose'}})
          .then(response => {
            return response.data.Id
          })
      }
      else {
        return Vue.$http.api.post(`lists(guid'${list.id}')/fields/addfield`, list.field, {headers: {'Content-Type': 'application/json;odata=verbose'}})
          .then(response => {
            return response.data.Id
          })
      }
    }
    else {
      return Vue.$http.api.post(`lists(guid'${list.id}')/fields`, list.field, {headers: {'Content-Type': 'application/json;odata=verbose'}})
    }
  }
}
