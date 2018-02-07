<template>
  <div>
    <q-modal no-backdrop-dismiss ref="modal" :content-css="{padding: '35px', minWidth: '75vw'}">
      <h5>Insertion de données depuis un autre environement</h5>
      <q-select v-model="insertDataFromEnvironment"
                :options="environments"
                float-label="Environement"></q-select>
      <q-select v-model="insertDataFromEnvironment"
                :options="environments"
                float-label="Liste"></q-select>
      <br>
      <q-btn class="float-right" color="primary" @click="createEnvironment()">valider</q-btn>
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

  export default {
    components: {
      QModal,
      QSelect,
      QBtn
    },
    data () {
      return {}
    },
    computed: {
      environments () {
        return this.$store.state.environments.map(e => {
          return {
            label: e.name,
            value: e.name
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
      }
    },
    methods: {
      open () {
        this.$refs.modal.open()
      },
      close () {
        this.$refs.modal.close()
      }
    }
  }
</script>
