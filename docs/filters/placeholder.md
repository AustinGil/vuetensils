# placeholder

Provides fallback content in the case of empty strings.

- [Source](https://github.com/Stegosource/vuetensils/blob/master/src/filters/index.js)

## Installation

Global install:

```js
import Vue from 'vue';
import { placeholder } from 'vuetensils/src/filters';

Vue.filter('placeholder', placeholder);
```

Local install:

```html
<script>
  import { placeholder } from 'vuetensils/src/filters';

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
