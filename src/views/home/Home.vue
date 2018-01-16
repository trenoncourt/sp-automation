<template>
  <div class="layout-padding">
    <site-home v-if="$store.state.environment"></site-home>
    <empty-home v-else=""></empty-home>
  </div>
</template>

<script>
  import EmptyHome from './EmptyHome.vue'
  import SiteHome from './SiteHome.vue'

  export default {
    components: {EmptyHome, SiteHome}
  }
</script>
