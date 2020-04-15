# number

Formats a string number to a user friendly number using the browser's [Intl object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).

[Source](https://github.com/Stegosource/vuetensils/blob/master/src/filters.js)

## Installation

Global install:

```js
import Vue from "vue"
import { number } from "vuetensils/src/filters"

Vue.filter("number", number)
```

Local install:

```html
<script>
  import { number } from "vuetensils/src/filters"

  export default {
    filters: {
      number,
    },
  }
</script>
```

## Example

```vue live
<template>
  <div>
    {{ "1234.567" | number }}
  </div>
</template>
```
