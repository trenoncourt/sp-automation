<template>
  <div>
    <q-modal ref="modal" :content-css="{padding: '35px', minWidth: '55vw'}">
      <h5>Insertion de données depuis un fichier</h5>
      <q-uploader url="" @add="importDataFrom" class="q-mb-xl" ref="uploader"/>
      <h6>Association Champ Excel et SharePoint</h6>
      <div v-for="row in mappedRows" :key="row.xlsxFieldName" class="row gutter-x-md">
        <div class="col-6">

          <q-btn size="md" flat v-model="row.xlsxFieldName" :label="row.xlsxFieldName.split('_')[0]"/>
        </div>
        <div class="col-6">
          <q-select
            v-model="row.spFieldName"
            filter
            :options="spFieldNames"></q-select>
        </div>
      </div>

      <q-btn class="q-mt-md float-right" color="primary" @click="importExcel()">valider</q-btn>
    </q-modal>
  </div>
</template>

<script>

import { UPDATE_INSERT_DATA_TO_LIST } from 'src/store/mutation-types'
import XLSX from 'XLSX'
import { UPDATE_LIST_FIELDS_IN_LISTS } from '../store/mutation-types'

export default {
  data () {
    return {
      environmentLists: [],
      spFieldNames: [],
      xlsxFieldNames: [],
      xlsxData: [],
      mappedRows: []
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
      this.mappedRows = []
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
      let name = files[0].name
      let extension = name.split('.')[1]
      if (extension === 'xlsx') {
        this.addExcel(list, reader)
        reader.readAsBinaryString(files[0])
      } else {
        this.addJSON(list, reader)
        reader.readAsText(files[0])
      }
    },
    addJSON (list, reader) {
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
    },
    importExcel () {
      let tasks = []
      let list = this.insertDataToList
      let isAffected = true
      for (let i = 0; i < this.xlsxData.length; i++) {
        let item = {}
        item.__metadata = {type: this.getItemTypeForListName(list.Title)}
        for (let j = 0; j < this.mappedRows.length; j++) {
          if (!this.mappedRows[j].spFieldName && isAffected) {
            this.$q.notify({
              color: 'negative',
              icon: 'check',
              message: 'Affecter chaque champs',
              position: 'center',
              timeout: 5000
            })
            isAffected = false
          }
          item[this.mappedRows[j].spFieldName] = this.xlsxData[i][this.mappedRows[j].xlsxFieldName]
        }
        if (isAffected) {
          let createTask = this.$http.api.lists.createItem(list.Id, item)
          tasks.push(createTask)
        }
      }

      if (isAffected) {
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
    },
    async addExcel (list, reader) {
      let vm = this
      this.spFieldNames = []
      this.xlsxFieldNames = []
      const updateListTask = this.$store.dispatch(UPDATE_LIST_FIELDS_IN_LISTS, list)
      reader.onload = async (e) => {
        let file = e.target.result

        let workbook = XLSX.read(file, {type: 'binary'})
        if (!workbook) {
          return
        }
        await updateListTask
        vm.spFieldNames = this.insertDataToList.fields.map(x => {
          return {value: x.InternalName, label: x.InternalName}
        })
        for (let x = 0; x < workbook.SheetNames.length; x++) {
          let sheetName = workbook.SheetNames[x]
          let sheet = workbook.Sheets[sheetName]
          let data = XLSX.utils.sheet_to_json(sheet, {header: 1})

          if (data.length === 0) {
            continue
          }

          const columnIdx = 0
          for (let j = 0; j < data[columnIdx].length; j++) {
            vm.xlsxFieldNames.push({value: data[columnIdx][j], label: data[columnIdx][j]})
          }

          let j = 0
          vm.xlsxData = []
          for (let z = columnIdx + 1; z <= data.length - 1; z++) {
            vm.xlsxData[j] = []
            for (let i = 0; i < data[z].length; i++) {
              let fieldName = vm.xlsxFieldNames[i].value
              vm.xlsxData[j][fieldName] = data[z][i]
            }
            j++
          }
        }

        vm.mappedRows = []
        for (let i = 0; i < vm.xlsxFieldNames.length; i++) {
          vm.mappedRows.push({xlsxFieldName: vm.xlsxFieldNames[i].value, spFieldName: ''})
        }

        this.loading = false
      }
    }
  }
}
</script>
