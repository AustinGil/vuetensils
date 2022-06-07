---
title: copy
position: 3
category: Directives
---

Vue directive to add a click-to-copy.

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/directives/copy.js)

## Installation

Global install:

```js
import Vue from 'vue';
import { copy } from 'vuetensils';

Vue.directive('copy', copy);
```

Local install:

```html
<script>
  import { copy } from 'vuetensils';

  export default {
    directives: {
      copy,
    },
  };
</script>
```

## Usage

```vue live
<template>
  <div>
    <p>Click this button then paste somewhere</p>
    <button v-copy="'Clipboard says what?'">
      Click to copy
    </button>
  </div>
</template>
```

Note that you must pass a string inside the `v-copy` value.
