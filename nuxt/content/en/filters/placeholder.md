---
title: placeholder
category: Filters
---

Provides fallback content in the case of empty strings.

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/filters/index.js)

## Installation

Global install:

```js
import Vue from 'vue';
import { placeholder } from 'vuetensils'';

Vue.filter('placeholder', placeholder);
```

Local install:

```html
<script>
  import { placeholder } from 'vuetensils'';

  export default {
    filters: {
      placeholder,
    },
  };
</script>
```

## Example

```vue live
<template>
  <div>
    {{ '' | placeholder('Use this if empty.') }}
  </div>
</template>
```
