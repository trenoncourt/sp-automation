<template>
  <div>
    <q-modal ref="modal" :content-css="{padding: '35px', minWidth: '75vw'}">
      <h5>Insertion de données depuis un autre environement</h5>
      <q-select v-model="insertDataFromEnvironment"
                :options="envsOptions"
                float-label="Environement"
                @input="onEnvironmentChange"></q-select>
      <q-select v-if="insertDataFromEnvironment"
                v-model="insertDataFromList"
                :options="environmentLists"
                float-label="Liste"></q-select>
      <br>
      <q-btn v-if="insertDataFromEnvironment" class="float-right" color="primary" @click="importDataFrom()">valider
      </q-btn>
    </q-modal>
  </div>
</template>

<script>

import listService from '../services/listService'
import listItemService from '../services/listItemService'
import { environmentMixin } from 'src/store/modules/environment'
import { listMixin } from 'src/store/modules/list'

export default {
  mixins: [listMixin, environmentMixin],
  data () {
    return {
      environmentLists: [],
      insertDataFromEnvironment: null,
      insertDataFromList: null
    }
  },
  computed: {
    envsOptions () {
      return this.environments.map(e => {
        return {
          label: e.name,
          value: e
        }
      })
    }
  },
  methods: {
    open () {
      this.$refs.modal.show()
    },
    close () {
      this.$refs.modal.hide()
    },
    onEnvironmentChange (e) {
      listService.getByEnvironment(e).then(data => {
        this.environmentLists = data.map(e => {
          return {
            value: e.Id,
            label: e.Title
          }
        })
        // const env = this.environmentLists.find(e => e.label === )
      })
    },
    importDataFrom () {
      console.log(this.insertDataFromEnvironment, this.insertDataFromList)
      listItemService.getByListIdAndEnvironment(this.insertDataFromList, this.insertDataFromEnvironment).then(data => {
        console.log(data)
        for (const item of data) {
          listItemService.add(this.insertDataToList, item)
        }
      })
    }
  }
}
</script>
