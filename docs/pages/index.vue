<template>
  <section class="container">
    <div>
      <h1 class="title">
        <pre>vuetensils</pre>
      </h1>
      <h2 class="subtitle">
        Accessible web components for Vue.js
      </h2>

      <vts-modal v-model="modal" @change="onChange">
        This modal content traps the focus
        <button>another</button>
        <button>another</button>
      </vts-modal>

      <vts-dropdown>
        dropdown content
        <button>click me</button>
      </vts-dropdown>

      <vts-dropdown>
        dropdown content
        <button>click me</button>
      </vts-dropdown>

      <!-- <vts-hidden>content</vts-hidden> -->

      <button @click="onClick">toggle</button>

      <vts-alert :visible="6">content</vts-alert>

      <vts-fetch url="https://jsonplaceholder.typicode.com/users">
        <div slot-scope="{ loading, error, response, send }">
          <p v-if="loading">Loading...</p>
          <p v-else-if="error">There was an error</p>
          <template v-else>
            <p>We got a response!</p>
            <button @click="send('https://jsonplaceholder.typicode.com/posts')">Send another?</button>
          </template>
        </div>
      </vts-fetch>

      <vts-loading name="ring"></vts-loading>
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
      // console.log(e)
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
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
</style>
