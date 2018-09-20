<template>
  <div>
    <q-modal ref="modal" :content-css="{padding: '35px', minWidth: '55vw'}">
      <h5>Insertion de données depuis un fichier</h5>
      <q-uploader ref="uploader" />

      <q-btn class="q-mt-md float-right" color="primary" @click="importDataFrom()">valider</q-btn>
    </q-modal>
  </div>
</template>

<script>

import { UPDATE_INSERT_DATA_TO_LIST } from 'src/store/mutation-types'

export default {
  data () {
    return {
      environmentLists: []
    }
  },
  computed: {
    insertDataToList: {
      get () {
        return this.$store.state.insertDataToList
      },
      set (value) {
        this.$store.commit(UPDATE_INSERT_DATA_TO_LIST, value)
      }
    }
  },
  methods: {
    getItemTypeForListName (name) {
      return 'SP.Data.' + name.charAt(0).toUpperCase() + name.split(' ').join('').slice(1) + 'ListItem'
    },
    open () {
      this.$refs.modal.show()
    },
    close () {
      this.$refs.modal.hide()
    },
    importDataFrom () {
      let files = this.$refs.uploader.files
      if (files.length === 0) {
        return
      }
      let list = this.insertDataToList
      let reader = new FileReader()
      reader.onload = event => {
        let data = JSON.parse(event.target.result)
        data = data.map(x => {
          return {
            ...x,
            __metadata: {type: this.getItemTypeForListName(list.Title)}
          }
        })
        let tasks = []
        for (const item of data) {
          let createTask = this.$http.api.lists.createItem(list.Id, item)
          tasks.push(createTask)
        }
        Promise.all(tasks).then(_ => {
          this.$q.notify({
            message: `Import réalisé avec succès`,
            color: 'positive',
            timeout: 4000,
            icon: 'check',
            position: 'top'
          })
          this.close()
        })
      }
      reader.readAsText(files[0])
    }
  }
}
</script>
