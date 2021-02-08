---
title: capitalize
category: Filters
---

Capitalizes the first letter of a string.

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/filters/index.js)

## Installation

Global install:

```js
import Vue from 'vue';
import { capitalize } from 'vuetensils/src/filters';

Vue.filter('capitalize', capitalize);
```

Local install:

```html
<script>
  import { capitalize } from 'vuetensils/src/filters';

  export default {
    filters: {
      capitalize,
    },
  };
</script>
```

## Example

```vue live
<template>
  <div>
    {{ 'please capitalize me.' | capitalize }}
  </div>
</template>
```
