# copy

Vue directive to add a click-to-copy

## Installation

Global install:

```js
import Vue from "vue"
import { copy } from "vuetensils"

Vue.directive("copy", copy)
```

Local install:

```html
<script>
  import { copy } from "vuetensils"

  export default {
    directives: {
      copy,
    },
  }
</script>
```

## Usage

```vue live
<template>
  <div>
    <p>Click this button then paste somewhere</p>
    <button v-copy="`Clipboard says what?`">
      Click to copy
    </button>
  </div>
</template>
```

Note that you must pass a string inside the `v-copy` value. The example has backticks. Single quotes would work as well.
