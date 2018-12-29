# Va11y UI

### Highly accessible, minimally styled web components for Vue.js

## Getting Started

Install the project:

`npm install vuetensils`

Import into your Vue project:

```
// main.js
import Vue from 'vue'
import Va11y from 'va11y-ui'

Vue.use(Va11y)
```

Alternatively, import just the components you need:

```
// main.js
import Vue from 'vue'
import { Va11yModal } from 'va11y-ui'

Vue.use(Va11yModal)
```

Use the components:

```
// Example.vue
<template>
  <div>
    <va11y-modal v-model="show">
      My modal content
    </va11y-modal>
  </div>
</template>
<script>
export default {
  data: () => ({
    show: true
  })
}
</script>
```
