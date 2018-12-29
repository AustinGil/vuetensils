# Vuetensils

### Highly accessible, minimally styled web components for Vue.js

## Getting Started

Install the project:

`npm install vuetensils`

Import into your Vue project:

```
// main.js
import Vue from 'vue'
import vuetensils from 'vuetensils'

Vue.use(vuetensils)
```

Alternatively, import just the components you need:

```
// main.js
import Vue from 'vue'
import { VtsModal } from 'vuetensils'

Vue.use(VtsModal)
```

Use the components:

```
// Example.vue
<template>
  <div>
    <vts-modal v-model="show">
      My modal content
    </vts-modal>
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
