<template>
  <div>
    <q-modal ref="modal" :content-css="{padding: '35px', minWidth: '45vw'}">
      <h5>Supprimer un environement</h5>
          <q-field>
            <q-select
              v-model="name"
              :options="selectOptions"
            />
          </q-field>
      <br>
      <q-btn class="float-right" color="primary" @click="deleteEnvironment()">Supprimer l'environement</q-btn>
    </q-modal>
  </div>
</template>

<script>

import { environmentMixin } from 'src/store/modules/environment'

export default {
  mixins: [environmentMixin],
  data () {
    return {
      nameAlreadyExist: false,
      name: '',
      selectOptions: []
    }
  },
  methods: {
    open () {
      this.name = ''
      this.selectOptions = []
      for (let elem in this.environments) {
        this.selectOptions.push({ label: this.environments[elem].name, value: this.environments[elem].name })
      }
      this.$refs.modal.show()
    },
    deleteEnvironment () {
      if (this.name === '') {
        this.$q.notify({
          message: `Aucun environement n'a été selectionné`,
          color: 'negative',
          timeout: 4000,
          icon: 'warning',
          position: 'top'
        })
      } else {
        this.delEnvironment(this.name)
        this.$refs.modal.hide()
      }
    }
  }
}
</script>
