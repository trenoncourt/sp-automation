<template>
  <div>
    <h3>Aucun environement séléctionné</h3>
    <h5>Vous pouvez séléctionner un environement dans le header en haut à droite</h5>
    <q-btn @click="$refs['environment-modal'].open()">Ajouter un environement</q-btn>
    <environment-modal ref="environment-modal"></environment-modal>
  </div>
</template>

<script>
  import { QBtn } from 'quasar-framework'
  import EnvironmentModal from 'views/environments/EnvironmentModal.vue'

  export default {
    components: {QBtn, EnvironmentModal}
  }
</script>
