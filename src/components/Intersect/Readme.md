Open your console and scroll around to watch events get fired.

```vue
<template>
  <div>
    <vts-intersection
      @enter="log('@enter fired for block 1')"
      @exit="log('@exit fired for block 1')"
      @change="log('@change fired for block 1')"
    >
      <div class="intersection-content">Content block 1</div>
    </vts-intersection>

    <vts-intersection
      @enter="log('@enter fired for block 2')"
      @exit="log('@exit fired for block 2')"
      @change="log('@change fired for block 2')"
    >
      <div class="intersection-content">Content block 2</div>
    </vts-intersection>

    <vts-intersection
      @enter="log('@enter fired for block 3')"
      @exit="log('@exit fired for block 3')"
      @change="log('@change fired for block 3')"
    >
      <div class="intersection-content">Content block 3</div>
    </vts-intersection>
  </div>
</template>

<script>
export default {
  methods: {
    log: console.log
  }
}
</script>

<style>
.intersection-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
  border: 1px solid;
}
</style>
```
