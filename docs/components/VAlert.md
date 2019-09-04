# VAlert

### Styled Examples

```vue live
<template>
  <VAlert class="error">
    <h3>Danger!</h3>
    <p>Something went horribly wrong!!!</p>
  </VAlert>
</template>

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

```vue live
<template>
  <div class="styled">
    <v-alert class="info" dismissible>
      Did you know that giraffes are afraid of heights?
    </v-alert>
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

### Unstyled Examples

```vue
<template>
  <v-alert>
    Here's something I need to tell you about.
  </v-alert>
</template>

<script>
export default {}
</script>
```

### Using v-model

With `v-model`, you can toggle an alert on or off.

```vue
<template>
  <div>
    <button @click="alert = !alert">Toggle alert</button>

    <v-alert v-model="alert">
      I can be toggled
    </v-alert>
  </div>
</template>

<script>
export default {
  data: () => ({
    alert: false,
  }),
}
</script>
```

### Dismissible

Allow users to hide an alert

```vue
<template>
  <v-alert dismissible>
    Click that button to make me go away
  </v-alert>
</template>

<script>
export default {}
</script>
```

```vue
<template>
  <div>
    <button @click="alert = true">Show alert</button>

    <v-alert v-model="alert" dismissible>
      Click that button to make me go away
    </v-alert>
  </div>
</template>

<script>
export default {
  data: () => ({
    alert: false,
  }),
}
</script>
```

You can provide your own content for the dismiss button with the `dismiss` slot.

```vue
<template>
  <v-alert dismissible>
    Click that button to make me go away

    <template slot="dismiss">
      Hide
    </template>
  </v-alert>
</template>

<script>
export default {}
</script>
```

### Countdown

It also supports providing seconds to the `visible` prop (or `v-model`) so the alert will hide after a short time.

```vue
<template>
  <div>
    <button @click="countdown = 10">Reset time</button>
    <v-alert v-model="countdown" dismissible>
      This alert will dismiss in {{ countdown }} seconds.
    </v-alert>
  </div>
</template>

<script>
export default {
  data: () => ({
    countdown: 10,
  }),
}
</script>
```

### Transitions

```vue
<template>
  <div>
    <button @click="alert = !alert">Toggle alert</button>

    <v-alert v-model="alert" transition="fade">
      I can be toggled
    </v-alert>
  </div>
</template>

<script>
export default {
  data: () => ({
    alert: false,
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
</style>
```
