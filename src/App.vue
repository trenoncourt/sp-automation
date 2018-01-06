<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script>
  import {ipcRenderer} from 'electron'

  export default {
    created () {
      ipcRenderer.on('sp-sites-update', (event, arg) => {
        console.log(arg)
      })
      ipcRenderer.send('init')
    }
  }
</script>

<style></style>
