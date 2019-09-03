<template>
  <div class="page">
    <h1 v-html="title"></h1>
    <Content />
  </div>
</template>
<script>
  export default {
    computed: {
      title() {
        return this.$page.title
      }
    }
  }
</script>