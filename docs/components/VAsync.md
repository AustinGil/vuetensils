# VAsync

A renderless component for awaiting promises to resolve; great for making HTTP requests. Supports showing pending, resolved, or rejected promises.

This component is great for handling any asynchronous tasks that involve promises. For example, HTTP requests:

```vue live
<template>
  <VAsync :await="httpRequest">
    <template v-slot:resolved="results">
      <h3>{{ results.title }}</h3>
      <p>{{ results.body }}</p>
    </template>
  </VAsync>
</template>

<script>
const url = "https://jsonplaceholder.typicode.com/posts/1"

export default {
  data: () => ({
    httpRequest: fetch(url).then(res => res.json()),
  }),
}
</script>
```

## Handle pending states

```vue live
<template>
  <VAsync :await="sleep">
    <template v-slot:pending>
      just...a bit...more...
    </template>

    <template v-slot:resolved>
      Ok, we're done
    </template>
  </VAsync>
</template>

<script>
export default {
  data: () => ({
    sleep: new Promise(res => setTimeout(res, 3000)),
  }),
}
</script>
```

## Handle rejected errors

```vue live
<template>
  <VAsync :await="sleep">
    <template v-slot:pending>
      just...a bit...more...
    </template>

    <template v-slot:rejected="error">
      {{ error }}
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
    ),
  }),
}
</script>
```

## Access full state with default scoped slot

```vue live
<template>
  <div>
    <VAsync :await="sleep">
      <template v-slot:default="{ pending, results, error }">
        <p v-if="pending">just...a bit...more...</p>
        <p v-else-if="error">{{ results }}</p>
        <p v-else="results">{{ results }}</p>
      </template>
    </VAsync>
  </div>
</template>

<script>
export default {
  data: () => ({
    sleep: new Promise((res, rej) =>
      setTimeout(() => {
        res("Woop! We're done")
      }, 2000)
    ),
  }),
}
</script>
```

## Dynamically assign promise

```vue live
<template>
  <div>
    <VAsync :await="waitForIt">
      <template v-slot:pending>
        <p>just...a bit...more...</p>
      </template>

      <template v-slot:resolved="results">
        <p>{{ results }}</p>
      </template>
    </VAsync>
    <button @click="onClick">Call new promise</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    waitForIt: null,
  }),

  methods: {
    onClick() {
      this.waitForIt = new Promise(res => {
        setTimeout(() => {
          res("Ok, we're done now.")
        }, 500)
      })
    },
  },
}
</script>
```

## Call promise using refs

```vue live
<template>
  <div>
    <VAsync ref="async">
      <template v-slot:pending>
        <p>just...a bit...more...</p>
      </template>

      <template v-slot:resolved="results">
        <p>{{ results }}</p>
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
    },
  },
}
</script>
```
