# tooltip

## Installation

```js
// main.js
import Vue from "vue"
import { tooltip } from "vuetensils"

Vue.directive("tooltip", tooltip)
```

## Default Behavior

```vue live
<template>
  <div>
    <div
      v-tooltip="$log"
      style="margin: 10px; border: 2px solid; padding: 10px;"
    >
      content
    </div>
  </div>
</template>
```
