<template>
  <div>
    <q-modal ref="modal" :content-css="{padding: '35px', minWidth: '55vw'}">
      <div class="text-center">
        <h5>Ajout d'un Item</h5>
      </div>
      <div v-for="row in mappedData" v-bind:key="row.fieldName" class="row gutter-x-md">
        <div class="col-md-6">

          <q-btn disabled size="md" flat  :label="row.fieldName" />
        </div>

        <div class="col-md-6">
          <q-field v-if="row.type === 1 || row.type === 9 ">
            <q-input v-model="row.data" type="number" />
          </q-field>
          <q-field v-if="row.type === 2 ">
            <q-input v-model="row.data" type="text" />
          </q-field>
          <q-field v-if="row.type === 3 ">
            <q-input v-model="row.data" type="textarea" />
          </q-field>
          <q-field v-if="row.type === 4 ">
             <q-datetime color="purple" v-model="row.data" type="datetime" float-label="Date & Time" />
          </q-field>
          <q-field v-if="row.type === 7 ">

            <q-select v-for="select in listSelects" v-bind:key="select.entity" v-model="row.data" v-if="select.length > 1 && row.fieldName === select[0].entity" :options="select" />
          </q-field>
          <q-field v-if="row.type === 8 ">
            <q-select v-model="row.data" :options="selectBool" />
          </q-field>
           <q-field v-if="row.type === 20 ">
            <q-search v-model="row.data" >
              <q-autocomplete @search="search" @selected="selected" />
            </q-search>
          </q-field>
        </div>
      </div>
      <q-btn class="q-mt-md float-right" v-if="this.$parent.isAdd" color="primary" @click="add()">valider</q-btn>
      <q-btn class="q-mt-md float-right" v-else color="primary" @click="modifier()">modifier</q-btn>
    </q-modal>
  </div>
</template>
<script>

import { filter } from 'quasar'

export default {
  data () {
    return {
      countSelect: 0,
      mappedData: [],
      list: {},
      Users: [],
      Groups: [],
      listSelects: [],
      listPersonnes: [],
      selectBool: [ {
        label: 'true',
        value: true
      },
      {
        label: 'false',
        value: false
      }],
      allSelect: []
    }
  },
  methods: {
    getItemTypeForListName (name) {
      return 'SP.Data.' + name.charAt(0).toUpperCase() + name.split(' ').join('').slice(1) + 'ListItem'
    },
    modifier () {
      let list = this.$store.state.changeVue
      let tasks = []
      let item = {}
      item.__metadata = {type: this.getItemTypeForListName(list.Title)}
      for (let j = 0; j < this.mappedData.length; j++) {
        if (this.mappedData[j].data !== '') {
          item[this.mappedData[j].nameForPost] = this.mappedData[j].data
        }
      }

      let updateTask = this.$http.api.lists.modifItem(list.Id, item, this.$parent.itemModif.Id)
      tasks.push(updateTask)

      Promise.all(tasks).then(_ => {
        this.$emit('refreshitem', 0)
        this.$q.notify({
          message: `Modifications réalisé avec succès`,
          color: 'positive',
          timeout: 4000,
          icon: 'check',
          position: 'top'
        })
      })
      this.$refs.modal.hide()
    },
    add () {
      let list = this.$store.state.changeVue
      let tasks = []
      let item = {}
      item.__metadata = {type: this.getItemTypeForListName(list.Title)}
      for (let j = 0; j < this.mappedData.length; j++) {
        if (this.mappedData[j].data !== '') {
          item[this.mappedData[j].nameForPost] = this.mappedData[j].data
        }
      }
      let createTask = this.$http.api.lists.createItem(list.Id, item)
      tasks.push(createTask)

      Promise.all(tasks).then(_ => {
        this.$emit('refreshitem', 1)
        this.$q.notify({
          message: `Ajout réalisé avec succès`,
          color: 'positive',
          timeout: 4000,
          icon: 'check',
          position: 'top'
        })
      })

      this.$refs.modal.hide()
    },
    open () {
      let vm = this
      this.mappedData = []
      if (this.$parent.isAdd) {
        for (let i = 0; i < this.$parent.Fields.length; i++) {
          let field = this.$parent.Fields[i]
          vm.mappedData.push({nameForPost: field.name, fieldName: field.label, data: '', type: field.type})
        }
      } else {
        for (let i = 0; i < this.$parent.Fields.length; i++) {
          let field = this.$parent.Fields[i]
          let types = Object.keys(this.$parent.itemModif)
          let dataModif = ''
          let y = 0
          while (y < types.length && dataModif === '') {
            if (types[y] === field.name) {
              dataModif = Object.values(this.$parent.itemModif)[y]
            }
            y++
          }
          vm.mappedData.push({nameForPost: field.name, fieldName: field.label, data: dataModif, type: field.type})
        }
      }
      this.$refs.modal.show()
    },
    parseList () {
      return this.listPersonnes.map(x => ({
        label: x.name,
        sublabel: x.mail,
        icon: x.icon,
        id: x.id,
        value: x.id
      })
      )
    },
    search (terms, done) {
      if (filter(terms, {field: 'label', list: this.parseList()}).length === 0) {
        setTimeout(() => {
          done(filter(terms, {field: 'sublabel', list: this.parseList()}))
        }, 1000)
      } else {
        setTimeout(() => {
          done(filter(terms, {field: 'label', list: this.parseList()}))
        }, 1000)
      }
    },
    selected (item) {
      this.$q.notify(`Selected suggestion "${item.id}"`)
    },
    getUsersAndGroups () {
      this.$http.api.lists.getUsers().then(response => {
        this.Users = response.value
        for (let i = 0; i < this.Users.length; i++) {
          this.listPersonnes.push({name: this.Users[i].Title, mail: this.Users[i].Email, icon: `person`, id: this.Users[i].Id})
        }
      })
      this.$http.api.lists.getGroups().then(response => {
        this.Groups = response.value
        for (let i = 0; i < this.Groups.length; i++) {
          this.listPersonnes.push({name: this.Groups[i].Title, mail: '', icon: `group`, id: this.Groups[i].Id})
        }
      })
    },
    count (table) {
      this.$http.api.lists.getList(table[0].id).then(response => {
        let countSelect = response.ItemCount
        this.data(table[0].id, countSelect, table)
      })
    },
    data (id, countSelect, table) {
      this.$http.api.lists.getItems(id, countSelect).then(response => {
        for (let i = 0; i < response.value.length; i++) {
          table.push({label: response.value[i].Id + '', value: response.value[i].Id})
        }
      })
    },
    getSelectOption (listSelects) {
      for (let i = 0; i < listSelects.length; i++) {
        this.count(listSelects[i])
      }
    }
  },
  created () {
    let idList = this.$store.state.changeVue.Id
    let idLookupList = ''
    let regex = /[{}]/gi
    this.$http.api.lists.getFields(idList).then(response => {
      for (let i = 0; i < response.value.length; i++) {
        idLookupList = ''
        if (response.value[i].LookupList !== undefined && response.value[i].LookupList !== '') {
          idLookupList = response.value[i].LookupList
        }
        if (idLookupList.startsWith('{') && response.value[i].Hidden === false && response.value[i].ReadOnlyField === false && idLookupList !== undefined) {
          this.listSelects.push([ { entity: response.value[i].EntityPropertyName, label: '( Aucun )', id: idLookupList.replace(regex, ''), value: 0 } ])
        }
      }
      this.getUsersAndGroups()
      this.getSelectOption(this.listSelects)
    })
  }
}
</script>
