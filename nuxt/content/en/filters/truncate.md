---
title: truncate
category: Filters
---

Truncates a string based on provided length.

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/filters/index.js)

## Installation

Global install:

```js
import Vue from 'vue';
import { truncate } from 'vuetensils'';

Vue.filter('truncate', truncate);
```

Local install:

```html
<script>
  import { truncate } from 'vuetensils'';

  export default {
    filters: {
      truncate,
    },
  };
</script>
```

## Example

```vue live
<template>
  <div>
    {{ text | truncate }}
  </div>
</template>

<script>
export default {
  computed: {
    text() {
      return 'The sword of Orion hundreds of thousands cosmic ocean as a patch of light the ash of stellar alchemy quasar. Network of wormholes paroxysm of global death vanquish the impossible kindling the energy hidden in matter hydrogen atoms invent the universe.';
    },
  },
};
</script>
```
