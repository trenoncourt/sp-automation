<template>
  <div class="layout-padding">
  </div>
</template>

<script>
  export default {
    created () {
      this.$http.api.get('web/lists')
    }
  }
</script>
