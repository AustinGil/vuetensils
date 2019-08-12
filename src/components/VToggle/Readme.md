### Styled Example

```vue
<template>
  <VToggle label="test" class="styled">
    <template v-slot:label>
      Click here to open the toggle
    </template>

    <div class="toggle-content">
      <p>Here is the content. Sweet!</p>
    </div>
  </VToggle>
</template>

<script>
export default {}
</script>
```

### Basic Usage

```vue
<template>
  <VToggle label="test">
    <template v-slot:label>
      Title
    </template>

    content here
  </VToggle>
</template>

<script>
export default {}
</script>
```
