# Alert

A simple component for notifiying users of specific information. Good for informative snippets, error messages, and more. It can be shown or hidden dynamically, and even supports auto-hiding after a given time.

- [Source](https://github.com/AustinGil/vuetensils/blob/master/src/components/VAlert/VAlert.vue)

Features:

- Includes ARIA `role="alert"` attribute
- Option for dismiss button
- Option for timeout

## Installation

Globally:

```js
// main.js
import Vue from 'vue';
import { VAlert } from 'vuetensils/src/components';

Vue.component('VAlert', VAlert);
```

Locally:

```vue
<script>
// SomeComponent.vue
import { VAlert } from 'vuetensils/src/components';

export default {
  components: {
    VAlert,
  },
  // ...
};
</script>
```

## Styled Examples

```vue live
<template>
  <div class="styled">
    <VAlert class="error">
      <h3>Danger!</h3>
      <p>Something went horribly wrong!!!</p>
    </VAlert>
  </div>
</template>
```

```css
.vts-alert.error {
  border: 1px solid currentColor;
  border-radius: 4px;
  padding: 0 10px;
  color: #900;
  background: #FDD;
}
```

```vue live
<template>
  <div class="styled">
    <VAlert class="info" dismissible>
      Did you know that giraffes are afraid of heights?
    </VAlert>
  </div>
</template>
```

```css
.vts-alert.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid currentColor;
  border-radius: 4px;
  padding: 10px;
  color: #009;
  background: #DFF;
}

.vts-alert.info .vts-alert__dismiss {
  border: 0;
  font: inherit;
  background: transparent;
}
```

## Unstyled Examples

```vue live
<template>
  <VAlert>
    Here's something I need to tell you about.
  </VAlert>
</template>
```

## Using v-model

With `v-model`, you can toggle an alert on or off.

```vue live
<template>
  <div>
    <button @click="alert = !alert">
      Toggle alert
    </button>

    <VAlert v-model="alert">
      I can be toggled
    </VAlert>
  </div>
</template>

<script>
export default {
  data: () => ({
    alert: false,
  }),
};
</script>
```

## Dismissible

Allow users to hide an alert

```vue live
<template>
  <VAlert dismissible>
    Click that button to make me go away
  </VAlert>
</template>
```

```vue live
<template>
  <div>
    <button @click="alert = true">
      Show alert
    </button>

    <VAlert v-model="alert" dismissible>
      Click that button to make me go away
    </VAlert>
  </div>
</template>

<script>
export default {
  data: () => ({
    alert: false,
  }),
};
</script>
```

You can provide your own content for the dismiss button with the `dismiss` slot.

```vue live
<template>
  <VAlert dismissible>
    Click that button to make me go away

    <template slot="dismiss">
      Hide
    </template>
  </VAlert>
</template>
```

## Countdown

It also supports providing seconds to the `visible` prop (or `v-model`) so the alert will hide after a short time.

```vue live
<template>
  <div>
    <button @click="countdown = 10">
      Reset time
    </button>
    <VAlert v-model="countdown" dismissible>
      This alert will dismiss in {{ countdown }} seconds.
    </VAlert>
  </div>
</template>

<script>
export default {
  data: () => ({
    countdown: 10,
  }),
};
</script>
```

## Transitions

```vue live
<template>
  <div>
    <button @click="alert = !alert">
      Toggle alert
    </button>

    <VAlert v-model="alert" transition="fade">
      I can be toggled
    </VAlert>
  </div>
</template>

<script>
export default {
  data: () => ({
    alert: false,
  }),
};
</script>
```

```css
.fade-enter-active,
.fade-leave-active {
  transition: 0.5s ease opacity;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
```

## Custom Classes

This component can accept a `classes` prop to cusomize the output HTML classes:

```
:classes="{ root: 'root-class', dismiss: 'dismiss-class' }"
```
