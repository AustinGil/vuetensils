---
title: 'Table'
category: 'Components'
---

**WIP: This component is still in active development. Give it a go, and please consider logging issues or feature requests on GitHub.**

Takes a list of objects and a list of table headers and creates an HTML table with sorting and pagination built in.

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/components/VTable/VTable.vue)

Features:

- Manages accessibility attributes for `tabindex`, `role`, `aria-labelledby`, `aria-sort`.
- Supports table sorting.
- Supports pagination.


## Installation

Globally:

```js
// main.js
import Vue from 'vue';
import { VTable } from 'vuetensils';

// Vue 3
app.component(
// Vue 2
Vue.component('VTable', VTable);
```

Locally:

```vue
<script>
// SomeComponent.vue
import { VTable } from 'vuetensils';

export default {
  components: {
    VTable,
  },
  // ...
};
</script>
```

## Styled Example

```vue live
<template>
  <VTable
    class="styled"
    :headers="headers"
    :items="people"
  />
</template>

<script>
export default {
  data: () => ({
    headers: [
      { key: 'name' },
      { key: 'age' },
      {
        key: 'gender',
        sortable: false
      },
    ],
    people: [
      {
        name: 'Mary',
        age: 33,
        gender: 'female'
      },
      {
        name: 'Bob',
        age: 56,
        gender: 'male'
      },
      {
        name: 'Ivana',
        age: 12,
        gender: 'female'
      },
      {
        name: 'Jeremy',
        age: 8,
        gender: 'male'
      },
      {
        name: 'Cassie',
        age: 45,
        gender: 'female'
      },
    ],
  }),
};
</script>
```
