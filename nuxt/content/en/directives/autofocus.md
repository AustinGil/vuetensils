---
title: autofocus
position: 3
category: Directives
---

Vue directive to bring focus to an element when it mounts to the page.

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/directives/autofocus.js)

## Installation

Global install:

```js
import Vue from 'vue';
import { autofocus } from 'vuetensils';

Vue.directive('autofocus', autofocus);
```

Local install:

```html
<script>
  import { autofocus } from 'vuetensils';

  export default {
    directives: {
      autofocus,
    },
  };
</script>
```

## Usage

```vue live
<template>
  <div>
    <p>Check it out, this input is focused whenever the page loads</p>
    <label>
      Some label
      <input v-autofocus />
    </label>
  </div>
</template>
```

With multiple elements, focus will land on the latest in the DOM.
