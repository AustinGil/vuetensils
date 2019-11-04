### Styled Examples

```vue
<template>
  <VDropdown
    text="Show me what you got!"
    transition="slide-up"
    class="styled"
    position="top"
  >
    Here is some custom dropdwon content.
  </VDropdown>
</template>

<script>
export default {}
</script>

<style>
.vts-dropdown__trigger {
  border: 0;
  border-radius: 5px;
  padding: 10px;
  font-size: 18px;
  color: #fff;
  background: darkcyan;
  transition: border-radius 0.5s ease;
}

.vts-dropdown__trigger[aria-expanded] {
  border-radius: 5px 5px 0 0;
}

.vts-dropdown__content {
  border: 1px solid darkcyan;
  border-radius: 0 0 5px 5px;
  padding: 10px;
}

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

### Custom Classes

This component can accept a `classes` prop to cusomize the output HTML classes:

```
:classes="{ root: 'root-class', trigger: 'trigger-class', content: 'content-class' }"
```
