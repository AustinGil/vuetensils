# capitalize

Capitalizes the first letter of a string.

[Source](https://github.com/Stegosource/vuetensils/blob/master/src/filters.js)

## Installation

Global install:

```js
import Vue from "vue"
import { capitalize } from "vuetensils"

Vue.filter("capitalize", capitalize)
```

Local install:

```html
<script>
  import { capitalize } from "vuetensils"

  export default {
    filters: {
      capitalize,
    },
  }
</script>
```

## Example

```vue live
<template>
  <div>
    {{ "please capitalize me." | capitalize }}
  </div>
</template>
```
