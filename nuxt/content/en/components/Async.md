---
title: Async
position: 2
category: Components
---

A renderless component for awaiting promises to resolve; great for making HTTP requests. Supports showing pending, resolved, or rejected promises.

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/components/VAsync/VAsync.vue)

Features:

- Provides abstraction for `pending`, `error`, and `results` logic for Promises.
- Scoped slots for `pending`, `rejected`, and `resolved` states.

## Installation

Globally:

```js
// main.js
import Vue from 'vue';
import { VAsync } from 'vuetensils';

// Vue 3
app.component(
// Vue 2
Vue.component('VAsync', VAsync);
```

Locally:

```vue
<script>
// SomeComponent.vue
import { VAsync } from 'vuetensils';

export default {
  components: {
    VAsync,
  },
  // ...
};
</script>
```

This component is great for handling any asynchronous tasks that involve promises. For example, HTTP requests:

```vue live
<template>
  <VAsync :await="httpRequest">
    <template #resolved="results">
      <div>
        <h3>{{ results.title }}</h3>
        <p>{{ results.body }}</p>
      </div>
    </template>
  </VAsync>
</template>

<script>
const url = 'https://jsonplaceholder.typicode.com/posts/1';

export default {
  data: () => ({
    httpRequest: fetch(url).then((response) => response.json()),
  }),
};
</script>
```

## Handle pending states

```vue live
<template>
  <VAsync :await="sleep">
    <template #pending>
      just...a bit...more...
    </template>

    <template #resolved>
      Ok, we're done
    </template>
  </VAsync>
</template>

<script>
export default {
  data: () => ({
    sleep: new Promise((resolve) => setTimeout(resolve, 3000)),
  }),
};
</script>
```

## Handle rejected errors

```vue live
<template>
  <VAsync :await="brokenPromise">
    <template #pending>
      just...a bit...more...
    </template>

    <template #rejected="error">
      {{ error }}
    </template>
  </VAsync>
</template>

<script>
export default {
  data: () => ({
    brokenPromise: Promise.reject(new Error('something went wrong'))
  })
};
</script>
```

## Access full state with default scoped slot

```vue live
<template>
  <div>
    <VAsync v-slot="promise" :await="sleep">
        <p v-if="promise.pending">
          just...a bit...more...
        </p>
        <p v-else-if="promise.error">
          {{ promise.error }}
        </p>
        <p v-else-if="promise.results">
          {{ promise.results }}
        </p>
    </VAsync>
  </div>
</template>

<script>
export default {
  data: () => ({
    sleep: new Promise((resolve, reject) =>
      setTimeout(() => {
        resolve('Woop! all done');
      }, 2000)
    ),
  }),
};
</script>
```

## Dynamically assign promise

```vue live
<template>
  <div>
    <VAsync :await="waitForIt">
      <template #pending>
        <p>just...a bit...more...</p>
      </template>

      <template #resolved="results">
        <p>{{ results }}</p>
      </template>
    </VAsync>
    <button @click="onClick">
      Call new promise
    </button>
  </div>
</template>

<script>
export default {
  data: () => ({
    waitForIt: null,
  }),

  methods: {
    onClick() {
      this.waitForIt = new Promise((resolve) => {
        setTimeout(() => {
          resolve('Ok, all done now.');
        }, 500);
      });
    },
  },
};
</script>
```

## Call promise using refs

```vue live
<template>
  <div>
    <VAsync ref="async">
      <template #pending>
        <p>just...a bit...more...</p>
      </template>

      <template #resolved="results">
        <p>{{ results }}</p>
      </template>
    </VAsync>
    <button @click="onClick">
      Call promise
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    onClick() {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve('Ok, all done now.');
        }, 500);
      });
      this.$refs.async.awaitOn(promise);
    },
  },
};
</script>
```
