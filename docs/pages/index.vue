<template>
  <section class="container">
    <div>
      <h1 class="title">
        <pre>va11y-ui</pre>
      </h1>
      <h2 class="subtitle">
        Accessible web components for Vue.js
      </h2>

      <va11y-modal v-model="modal" @change="onChange">
        modal content
      </va11y-modal>

      <button @click="onClick">toggle</button>

      showing: {{ modal }}
      <!-- <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
      </div> -->
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    modal: false
  }),

  methods: {
    onClick(e) {
      this.modal = !this.modal
    },

    onChange(e) {
      console.log(e)
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
