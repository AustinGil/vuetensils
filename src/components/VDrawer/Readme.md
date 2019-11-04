### Styled Examples

```vue
<template>
  <div class="styled">
    <VDrawer v-model="showDrawer" transition="slide-right" bg-transition="fade">
      My drawer content
    </VDrawer>

    <button @click="showDrawer = !showDrawer">Toggle Drawer</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    showDrawer: false,
  }),
}
</script>

<style>
.vts-drawer {
  background: rgba(0, 0, 255, 0.5);
}

.vts-drawer__content {
  padding: 20px;
  color: #fff;
  background: #222;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.slide-right-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
```

### Unstyled Examples

```vue
<template>
  <div>
    <VDrawer v-model="showDrawer">
      My drawer content
    </VDrawer>

    <button @click="showDrawer = !showDrawer">Toggle Drawer</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    showDrawer: false,
  }),
}
</script>
```

### Right aligned

```vue
<template>
  <div>
    <VDrawer v-model="showDrawer" right>
      My drawer content
    </VDrawer>

    <button @click="showDrawer = !showDrawer">Toggle Drawer</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    showDrawer: false,
  }),
}
</script>
```

### Prevent page scroll

```vue
<template>
  <div>
    <VDrawer v-model="showDrawer" noScroll>
      My drawer content
    </VDrawer>

    <button @click="showDrawer = !showDrawer">Toggle Drawer</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    showDrawer: false,
  }),
}
</script>
```

### Add transitions

```vue
<template>
  <div>
    <VDrawer v-model="showDrawer" transition="slide-right" bg-transition="fade">
      My drawer content
    </VDrawer>

    <button @click="showDrawer = !showDrawer">Toggle Drawer</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    showDrawer: false,
  }),
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.slide-right-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
```

```vue
<template>
  <div>
    <VDrawer
      v-model="showDrawer"
      transition="slide-left"
      bg-transition="fade"
      right
    >
      My drawer content
    </VDrawer>

    <button @click="showDrawer = !showDrawer">Toggle Drawer</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    showDrawer: false,
  }),
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.slide-left-enter,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
```

### Custom Classes

This component can accept a `classes` prop to cusomize the output HTML classes:

```
:classes="{ root: 'root-class', content: 'content-class' }"
```
