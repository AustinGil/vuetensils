## Make an HTTP request

```vue
<template>
  <VAsync :await="httpRequest">
    <template slot-scope="{ results }">
      <div v-if="results">
        <h3>{{ results.title }}</h3>
        <p>{{ results.body }}</p>
      </div>
    </template>
  </VAsync>
</template>

<script>
const url = "https://jsonplaceholder.typicode.com/posts/1"

export default {
  data: () => ({
    httpRequest: fetch(url).then(res => res.json())
  })
}
</script>
```

## Handle pending states

This component uses a custom Promise that waits 3 second to resolve

```vue
<template>
  <VAsync :await="sleep">
    <template slot-scope="{ pending }">
      <p v-if="pending">just...a bit...more...</p>
      <p v-else>Ok, we're done</p>
    </template>
  </VAsync>
</template>

<script>
export default {
  data: () => ({
    sleep: new Promise(res => setTimeout(res, 3000))
  })
}
</script>
```

## Handle rejected errors

```vue
<template>
  <VAsync :await="sleep">
    <template slot-scope="{ pending, error }">
      <p v-if="pending">just...a bit...more...</p>
      <pre v-else-if="error">{{ error }}</pre>
      <p v-else>Ok, we're done</p>
    </template>
  </VAsync>
</template>

<script>
export default {
  data: () => ({
    sleep: new Promise((res, rej) =>
      setTimeout(() => {
        rej(new Error("something went wrong"))
      }, 2000)
    )
  })
}
</script>
```

## Wait until later to assign the promise

```vue
<template>
  <VAsync :await="waitForIt">
    <template slot-scope="{ pending, results }">
      <p v-if="pending">just...a bit...more...</p>
      <p v-else-if="results">{{ results }}</p>
      <button @click="onClick">Call promise</button>
    </template>
  </VAsync>
</template>

<script>
export default {
  data: () => ({
    waitForIt: null
  }),

  methods: {
    onClick() {
      this.waitForIt = new Promise(res => {
        setTimeout(() => {
          res("Ok, we're done now.")
        }, 500)
      })
    }
  }
}
</script>
```

## Call promise using refs

```vue
<template>
  <div>
    <VAsync ref="async">
      <template slot-scope="{ pending, results }">
        <p v-if="pending">just...a bit...more...</p>
        <p v-else-if="results">{{ results }}</p>
      </template>
    </VAsync>
    <button @click="onClick">Call promise</button>
  </div>
</template>

<script>
export default {
  methods: {
    onClick() {
      const promise = new Promise(res => {
        setTimeout(() => {
          res("Ok, we're done now.")
        }, 500)
      })
      this.$refs.async.awaitOn(promise)
    }
  }
}
</script>
```
