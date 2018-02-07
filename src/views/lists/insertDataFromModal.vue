<template>
  <div>
    <q-modal no-backdrop-dismiss ref="modal" :content-css="{padding: '35px', minWidth: '75vw'}">
      <h5>Insertion de données depuis un autre environement</h5>
      <q-select v-model="insertDataFromEnvironment"
                :options="environments"
                float-label="Environement"
                @change="onEnvironmentChange"></q-select>
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
  import {
    QBtn,
    QModal,
    QSelect
  } from 'quasar-framework'
  import { UPDATE_INSERT_DATA_FROM_ENVIRONMENT } from 'store/mutation-types'
  import listService from '../../services/listService'
  import listItemService from '../../services/listItemService'
  import { UPDATE_INSERT_DATA_FROM_LIST } from '../../store/mutation-types'

  export default {
    components: {
      QModal,
      QSelect,
      QBtn
    },
    data () {
      return {
        environmentLists: []
      }
    },
    computed: {
      environments () {
        return this.$store.state.environments.map(e => {
          return {
            label: e.name,
            value: e
          }
        })
      },
      insertDataFromEnvironment: {
        get () {
          return this.$store.state.insertDataFromEnvironment
        },
        set (value) {
          this.$store.commit(UPDATE_INSERT_DATA_FROM_ENVIRONMENT, value)
        }
      },
      insertDataFromList: {
        get () {
          return this.$store.state.insertDataFromList
        },
        set (value) {
          this.$store.commit(UPDATE_INSERT_DATA_FROM_LIST, value)
        }
      }
    },
    methods: {
      open () {
        this.$refs.modal.open()
      },
      close () {
        this.$refs.modal.close()
      },
      onEnvironmentChange (e) {
        console.log(this.insertDataFromEnvironment, e)
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
            listItemService.add(this.$store.state.insertDataToList, item)
          }
        })
      }
    }
  }
</script>
