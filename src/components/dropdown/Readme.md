```vue
<template>
  <vts-dropdown
    text="Show me what you got!"
    transition="slide-up"
  >
    <p>Here is the dropdown content.
      <br />Why not add a nav?
    </p>
    <nav>
      <ul>
        <li><a href="#">link</a></li>
        <li><a href="#">link</a></li>
        <li><a href="#">link</a></li>
      </ul>
    </nav>
  </vts-dropdown>
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
