# copy

Vue directive to add a click-to-copy.

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/directives/copy.js)

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
