# Notifications

<!-- Uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) to fire events when content enters or exits the screen.

The components accepts four props: `root`, `rootMargin`, `threshold`, and `options`. The first three correspond to the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) options properties, or you can pass them all together to the `options` prop.

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/components/VIntersect/VIntersect.vue) -->

## Examples

```vue live
<template>
  <div class="styled">
    <button @click="click">Click</button>
    <VNotifications timeout="1000" class="bottom-0 right-0" />
  </div>
</template>

<script>
export default {
  methods: {
    log: console.log,
    click() {
      this.$vnotify('yo')
    }
  },
};
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

## Using a scoped slot

By using scoped slots, you can access the current [`IntersectionObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)

(Setting the threshold to 1 means the entire element must be visible before `isIntersecting` changes)

```vue live
<template>
  <div>
    <VIntersect :threshold="1">
      <template #default="entry">
        <div
          class="intersection-content"
          :style="{
            background: entry.isIntersecting ? 'lightgreen' : 'lightcoral',
          }"
        >
          isIntersecting: {{ entry.isIntersecting }}
        </div>
      </template>
    </VIntersect>
  </div>
</template>

<script>
export default {
  methods: {
    log: console.log,
  },
};
</script>
```
