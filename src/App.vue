<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { listMixin } from 'src/store/modules/list'
import { environmentMixin } from 'src/store/modules/environment'

export default {
  name: 'App',
  mixins: [listMixin, environmentMixin],
  created () {
    this.fetchEnvironments()
    this.selectEnvironment()
  }
}
</script>

<style>
</style>
