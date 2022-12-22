# plural

Provides options for pluralizing a string based on input count.

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/filters/index.js)

## Installation

Global install:

```js
import Vue from 'vue';
import { plural } from 'vuetensils/src/filters';

Vue.filter('plural', plural);
```

Local install:

```html
<script>
  import { plural } from 'vuetensils/src/filters';

  export default {
    filters: {
      plural,
    },
  };
</script>
```

## Example

```vue live
<template>
  <div>
    <p>{{ 'Item' | plural('Items', 0) }}</p>
    <p>{{ 'Dog' | plural('Dogs', 1) }}</p>
    <p>{{ 'Goose' | plural('Geese', 3) }}</p>
  </div>
</template>
```

<!-- pluralize(text, num, plural) {
  plural = plural || text + 's'
  return `${num} ${num === 1 ? text : plural}`;
} -->
