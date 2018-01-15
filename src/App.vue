<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import { UPDATE_JSON_LISTS } from 'store/mutation-types'
  import settings from 'electron-settings'
  import { UPDATE_ENVIRONMENT, UPDATE_ENVIRONMENTS } from './store/mutation-types'

  export default {
    created () {
      ipcRenderer.on('sp-sites-update', (event, arg) => {
        // console.log(arg)
        this.$store.commit(UPDATE_JSON_LISTS, arg)
      })
      ipcRenderer.send('init')
      const environments = settings.get('environments') || []
      const environment = settings.get('environment')
      this.$store.commit(UPDATE_ENVIRONMENTS, environments)
      if (environment) {
        this.$store.commit(UPDATE_ENVIRONMENT, environment)
      }
    }
  }
</script>

<style></style>
