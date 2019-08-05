## Make an HTTP request

```vue
<template>
  <VAsync :await="httpRequest">
    <template slot-scope="{ results }">
      <h3>{{ results.title }}</h3>
      <p>{{ results.body }}</p>
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

## Wait until later to show results

Note: If you pass a promise directly, the promise will be invoked immediately and any future references will already be resolved. Clicking the button again shows the immediate results.

```vue
<template>
  <VAsync>
    <template slot-scope="{ pending, results, call }">
      <p v-if="pending">just...a bit...more...</p>
      <p v-else-if="results">{{ results }}</p>
      <button @click="call(waitForIt)">Call promise</button>
    </template>
  </VAsync>
</template>

<script>
export default {
  data: () => ({
    waitForIt: new Promise(res => {
      setTimeout(() => {
        res("Ok, we're done now.")
      }, 500)
    })
  })
}
</script>
```

## Dynamic promises

Pass a function that returns the promise in order to make it truly dynamic. This allows you to re-call the same promise, or change it to a new one.

```vue
<template>
  <VAsync>
    <template slot-scope="{ pending, results, call }">
      <p v-if="pending">just...a bit...more...</p>
      <p v-else-if="results">{{ results }}</p>
      <button @click="call(waitForIt)">Call promise</button>
    </template>
  </VAsync>
</template>

<script>
export default {
  data: () => ({
    waitForIt: () =>
      new Promise(res => {
        setTimeout(() => {
          res("Ok, we're done now.")
        }, 500)
      })
  })
}
</script>
```
