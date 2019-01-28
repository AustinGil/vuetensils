```vue
<template>
  <vts-fetch 
    :url="'https://jsonplaceholder.typicode.com/users/' + userId"
    @success="userId++"
  >
    <div slot-scope="{ loading, error, response, fetch }">
      <p v-if="loading">Loading...</p>

      <p v-else-if="error">There was an error</p>

      <template v-else>
        <p>JSON response:</p>
        <code>{{ response }}</code>
        <br />
      </template>

      <button @click="fetch('https://jsonplaceholder.typicode.com/users/' + userId)">Get next user</button>
      <button @click="fetch('https://httpstat.us/500')">Get a 500 error</button>
    </div>
  </vts-fetch>
</template>

<script>
export default {
  data: () => ({
    userId: 1
  })
}
</script>
```
