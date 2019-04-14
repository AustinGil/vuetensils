```vue
<template>
  <vts-alert>
    Here's something I need to tell you about.
  </vts-alert>
</template>

<script>
export default {}
</script>
```

### Using v-model

```vue
<template>
  <div>
    <button @click="alert = !alert">Toggle alert</button>

    <vts-alert v-model="alert">
      I can be toggled
    </vts-alert>
  </div>
</template>

<script>
export default {
  data: () => ({
    alert: false
  })
}
</script>
```

### Dismissible

```vue
<template>
  <vts-alert dismissible>
    Click that button to make me go away
  </vts-alert>
</template>

<script>
export default {}
</script>
```

```vue
<template>
  <div>
    <button @click="alert = true">Show alert</button>

    <vts-alert v-model="alert" dismissible>
      Click that button to make me go away
    </vts-alert>
  </div>
</template>

<script>
export default {
  data: () => ({
    alert: false
  })
}
</script>
```

```vue
<template>
  <vts-alert dismissible>
    Click that button to make me go away

    <template slot="button"
      >Hide</template
    >
  </vts-alert>
</template>

<script>
export default {}
</script>
```

### Countdown

```vue
<template>
  <div>
    <button @click="countdown = 10">Reset time</button>
    <vts-alert v-model="countdown" dismissible>
      This alert will dismiss in {{ countdown }} seconds.</vts-alert
    >
  </div>
</template>

<script>
export default {
  data: () => ({
    countdown: 10
  })
}
</script>
```

### Transitions

```vue
<template>
  <div>
    <button @click="alert = !alert">Toggle alert</button>

    <vts-alert v-model="alert" transition="fade">
      I can be toggled
    </vts-alert>
  </div>
</template>

<script>
export default {
  data: () => ({
    alert: false
  })
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
</style>
```

### Styled Examples

```vue
<template>
  <vts-alert class="error">
    <h3>Danger!</h3>
    <p>Something went horribly wrong!!!</p>
  </vts-alert>
</template>

<script>
export default {}
</script>

<style>
.vts-alert.error {
  border: 1px solid currentColor;
  border-radius: 4px;
  padding: 0 10px;
  color: #900;
  background: #fdd;
}
</style>
```

```vue
<template>
  <div class="styled">
    <vts-alert class="info" dismissible>
      Did you know that giraffes are afraid of heights?
    </vts-alert>
  </div>
</template>

<script>
export default {}
</script>

<style>
.vts-alert.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid currentColor;
  border-radius: 4px;
  padding: 10px;
  color: #009;
  background: #dff;
}

.vts-alert.info .vts-alert__dismiss {
  border: 0;
  font: inherit;
  background: transparent;
}
</style>
```
