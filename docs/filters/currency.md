# currency

Formats a string number to a currency number using the browser's [Intl object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).

[Source](https://github.com/Stegosource/vuetensils/blob/master/src/filters.js)

## Installation

Global install:

```js
import Vue from "vue"
import { currency } from "vuetensils"

Vue.filter("currency", currency)
```

Local install:

```html
<script>
  import { currency } from "vuetensils"

  export default {
    filters: {
      currency,
    },
  }
</script>
```

## Example

```vue live
<template>
  <div>
    {{ "1234" | currency("USD") }}
  </div>
</template>
```
