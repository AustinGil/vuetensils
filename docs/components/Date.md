# Date

[Source](https://github.com/Stegosource/vuetensils/blob/master/src/components/VDate/VDate.vue)

## Installation

Globally:

```js
// main.js
import Vue from "vue"
import { VDate } from "vuetensils/src/components"

Vue.component("VDate", VDate)
```

Locally:

```vue
<script>
// SomeComponent.vue
import { VDate } from "vuetensils/src/components"

export default {
  components: {
    VDate,
  },
  // ...
}
</script>
```

## Styled Example

```vue live
<template>
  <div>
    <VDate
      v-model="date"
    >
    </VDate>

    {{ date }}
  </div>
</template>

<script>
export default {
  data: () => ({
    date: 'May 31 2019',
  }),
}
</script>
```



## Custom Classes

This component can accept a `classes` prop to cusomize the output HTML classes:

```
:classes="{ root: 'root-class', content: 'content-class' }"
```
