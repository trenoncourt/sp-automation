<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script>
  import {ipcRenderer} from 'electron'
  import {UPDATE_JSON_LISTS} from 'store/mutation-types'

  export default {
    created () {
      ipcRenderer.on('sp-sites-update', (event, arg) => {
        // console.log(arg)
        // this.$store.commit(UPDATE_JSON_LISTS, arg)
      })
      ipcRenderer.send('init')
    }
  }
</script>

<style></style>
