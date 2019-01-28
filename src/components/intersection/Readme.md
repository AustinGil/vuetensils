```vue
<template>
  <vts-intersection
    @enter="consoleLog('@enter fired')"
    @leave="consoleLog('@leave fired')"
    @change="consoleLog('@change fired')"
  >
    Check your browser console to see updates.
  </vts-intersection>
</template>

<script>
export default {
  methods: {
    consoleLog: console.log
  }
}
</script>
```
