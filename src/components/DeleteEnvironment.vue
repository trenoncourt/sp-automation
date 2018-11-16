<template>
  <div>
    <q-modal ref="modal" :content-css="{padding: '35px', minWidth: '45vw'}">
      <h5>Supprimer un environement</h5>
          <q-field>
            <q-input
              float-label="Nom"
              v-model="name"
            ></q-input>
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
      name: ''
    }
  },
  methods: {
    open () {
      this.name = ''
      this.$refs.modal.show()
    },
    deleteEnvironment () {
      this.delEnvironment(this.name)
      this.$refs.modal.hide()
    }
  }
}
</script>
