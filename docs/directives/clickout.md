# clickout

Vue directive to fire a function when the user clicks anywhere outside the target element.

## Installation

Global install:

```js
import Vue from "vue"
import { clickout } from "vuetensils"

Vue.directive("clickout", clickout)
```

Local install:

```html
<script>
  import { clickout } from "vuetensils"

  export default {
    directives: {
      clickout,
    },
  }
</script>
```

## Usage

```vue live
<template>
  <div>
    <p>Check it out, this input is focused whenever the page loads</p>
    <form>
      <label>
        Some label
        <input v-clickout />
      </label>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    onClickout() {},
  },
}
</script>
```
