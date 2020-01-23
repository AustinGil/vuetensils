# VTable

WIP

## Installation

Globally:

```js
// main.js
import Vue from "vue"
import { VTable } from "vuetensils"

Vue.component("VTable", VTable)
```

Locally:

```vue
<script>
// SomeComponent.vue
import { VTable } from "vuetensils"

export default {
  components: {
    VTable,
  },
  // ...
}
</script>
```

## Styled Example

```vue live
<template>
  <VTable class="styled" :headers="headers" :items="people"></VTable>
</template>

<script>
export default {
  data: () => ({
    headers: [
      { key: "name" },
      { key: "age" },
      { key: "gender", sortable: false },
    ],
    people: [
      { name: "Mary", age: 33, gender: "female" },
      { name: "Bob", age: 56, gender: "male" },
      { name: "Ivana", age: 12, gender: "female" },
      { name: "Jeremy", age: 8, gender: "male" },
      { name: "Cassie", age: 45, gender: "female" },
    ],
  }),
}
</script>
```
