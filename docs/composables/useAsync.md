# useAsync WIP

<!-- A renderless component for awaiting promises to resolve; great for making HTTP requests. Supports showing pending, resolved, or rejected promises.

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/components/VAsync/VAsync.vue)

Features:

- Provides abstraction for `pending`, `error`, and `results` logic for Promises.
- Scoped slots for `pending`, `rejected`, and `resolved` states. -->

<!-- ## Installation

Globally:

```js
// main.js
import Vue from 'vue';
import { VAsync } from 'vuetensils/src/components';

Vue.component('VAsync', VAsync);
``` -->

<!-- Locally:

```vue
<script>
// SomeComponent.vue
import { VAsync } from 'vuetensils/src/components';

export default {
  components: {
    VAsync,
  },
  // ...
};
</script>
``` 
-->

<!-- This component is great for handling any asynchronous tasks that involve promises. For example, HTTP requests: -->

```vue
<template>
  <pre>
    {{ promise }}
  </pre>
</template>

<script>
import { defineComponent } from 'vue'
import { useAsync } from 'vuetensils/src/composables'
const url = 'https://jsonplaceholder.typicode.com/posts/1';

export default defineComponent(() => {
  const promise = useAsync(fetch(url).then((response) => response.json()));
  
  return {
    promise
  };
});
</script>
```