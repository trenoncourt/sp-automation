<template>
  <div class="layout-padding">
    <site-home v-if="environment"></site-home>
    <empty-home v-else=""></empty-home>
  </div>
</template>

<script>
import EmptyHome from './EmptyHome.vue'
import SiteHome from './SiteHome.vue'
import { environmentMixin } from '../../store/modules/environment'

export default {
  mixins: [environmentMixin],
  components: {EmptyHome, SiteHome}
}
</script>
