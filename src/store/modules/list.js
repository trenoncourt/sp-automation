import Vue from 'vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import { ipcRenderer } from 'electron'
import Field from '../../models/Field'
import RandomItem from '../../models/RandomItem'

export const state = {
  lists: [],
  jsonLists: [],
  insertDataToList: null
}

export const mutations = {
  ADD_LIST (state, value) {
    state.lists.push(value)
  },
  DELETE_LIST (state, listId) {
    state.lists = state.lists.filter(l => l.Id !== listId)
  },
  SET_LISTS (state, newValue) {
    state.lists = newValue
  },
  SET_JSON_LISTS (state, newValue) {
    state.jsonLists = newValue
  },
  SET_LIST_FIELDS_IN_LISTS (state, list) {
    let currentList = state.lists.find(o => o.Id === list.id)
    Vue.set(currentList, 'fields', list.fields)
  },
  SET_INSERT_DATA_TO_LIST (state, newValue) {
    state.insertDataToList = newValue
  }
}

export const getters = {
  visibleLists () {
    return state.lists.filter(i => !i.Hidden)
  }
}

export const actions = {
  updateInsertDataToList ({commit}, insertDataToList) {
    commit('SET_INSERT_DATA_TO_LIST', insertDataToList)
  },
  async readJsonLists ({commit}) {
    ipcRenderer.on('sp-sites-update', (event, arg) => {
      let data = arg.filter(x => x.title)
      commit('SET_JSON_LISTS', data)
    })
    await ipcRenderer.send('readJsonFiles')
  },
  async fetchLists (store) {
    await store.dispatch('readJsonLists')
    const response = await window.http.api.lists.get()

    let lists = response.value.filter(l => !l.Hidden)

    let createdLists = store.state.jsonLists.filter(x => lists.some(l => l.Title === x.title))
    let uncreatedLists = store.state.jsonLists
      .filter(x => !lists.some(l => l.Title === x.title))
      .map(x => { return { ...x, Title: x.title, jsonList: true } })

    // Retrieve fields for all list
    // let tasks = []
    // for (let list of lists) {
    //   tasks.push(window.http.api.lists.getFields(list.Id).then(data => { list.Fields = data.value }))
    // }

    // await Promise.all(tasks)

    for (let list of lists) {
      let jsonFile = createdLists.find(x => x.title === list.Title)
      list.jsonFileExist = jsonFile
    }

    lists = lists.concat(uncreatedLists)

    store.commit('SET_LISTS', lists)
  },
  async createList ({commit}, list) {
    const response = await window.http.api.lists.create(list)
    commit('ADD_LIST', response)
    return response.Id
  },
  async updateListFieldsInLists ({commit}, list) {
    const response = await window.http.api.lists.getFields(list.Id)
    commit('SET_LIST_FIELDS_IN_LISTS', {id: list.Id, fields: response.value})
  },
  async createListField (store, list) {
    if (list.field.lookupListId) {
      if (list.field.primaryLookupFieldId) {
        const response = await window.http.api.lists.addDependentLookupField(list.id, list.field)
        if (list.field.allowMultipleValues) {
          const fieldId = response.Id
          await window.http.api.lists.patchField(list.id, response.Id,
            {
              '__metadata': {'type': 'SP.FieldLookup'},
              'AllowMultipleValues': true
            })
          return fieldId
        }
        return response.Id
      } else {
        const response = await window.http.api.lists.addField(list.id, list.field)
        if (list.field.allowMultipleValues) {
          const fieldId = response.Id
          await window.http.api.lists.patchField(list.id, response.Id,
            {
              '__metadata': {'type': 'SP.FieldLookup'},
              'AllowMultipleValues': true
            })
          return fieldId
        }
        return response.Id
      }
    } else {
      const response = await window.http.api.lists.createField(list.id, list.field)
      return response
    }
  },
  async createListFields (store, list) {
    const fieldsCalls = []
    for (const field of list.fields) {
      const f = new Field(field.title, field.type)
      fieldsCalls.push(window.http.api.lists.createField(list.id, f))
    }
    await Promise.all(fieldsCalls)
  },
  async createListItems (store, payload) {
    const itemsCalls = []
    for (let i = 0; i < payload.count; i++) {
      const randomItem = new RandomItem(payload.list.Title)
      randomItem.setField(payload.list.fields)
      randomItem.setFieldGroups(payload.fieldGroups)
      randomItem.setLookupFields(payload.lookupFields)
      itemsCalls.push(window.http.api.lists.createItem(payload.list.Id, randomItem))
    }
    await Promise.all(itemsCalls)
  },
  async deleteList ({commit}, list) {
    await window.http.api.lists.delete(list.Id)
    commit('DELETE_LIST', list.Id)
  }
}

export const listMixin = {
  computed: {
    ...mapState('list', ['lists', 'jsonLists', 'insertDataToList']),
    ...mapGetters('list', ['visibleLists'])
  },
  methods: {
    ...mapActions('list', ['updateInsertDataToList', 'fetchLists', 'createList', 'updateListFieldsInLists', 'createListField',
      'createListFields', 'createListItems', 'deleteList'])
  }
}
