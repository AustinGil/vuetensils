### Styled Examples

```vue
<template>
  <VDropdown text="Show me what you got!" transition="slide-up" class="styled">
    Here is some custom dropdwon content.
  </VDropdown>
</template>

<script>
export default {}
</script>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transform: translateY(0);
  transition: opacity 0.5s, transform 0.5s;
}

.slide-up-enter,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
```

### Unstyled Examples

```vue
<template>
  <VDropdown text="Show me what you got!">
    <p>This will close on click-out or focus-out.</p>
    <p>Try keyboard navigation.</p>
    <nav>
      <ul>
        <li><a href="#">link</a></li>
        <li><a href="#">link</a></li>
        <li><a href="#">link</a></li>
      </ul>
    </nav>
  </VDropdown>
</template>

<script>
export default {}
</script>
```

### With a transition

```vue
<template>
  <VDropdown text="Show me what you got!" transition="slide-up" position="top">
    <p>Here is the dropdown content with a nav.</p>
    <nav>
      <ul>
        <li><a href="#">link</a></li>
        <li><a href="#">link</a></li>
        <li><a href="#">link</a></li>
      </ul>
    </nav>
  </VDropdown>
</template>

<script>
export default {}
</script>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transform: translateY(0);
  transition: opacity 0.5s, transform 0.5s;
}

.slide-up-enter,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
```
