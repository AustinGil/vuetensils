# useAsync WIP

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